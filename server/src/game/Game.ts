import { nanoid } from 'nanoid';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player/Player';
import { pubsub } from '..';
import { GameLogs } from './GameLogs';
import { Interpreter, ParsedCode } from '../interpreter/Interpreter';
import { Target } from './utils/Target';

//create a class decorator that will inject a property called id
type PlayerInput = {
    deckTemplate: DeckTemplate;
    account: Account;
};
export type EventCallback = (
    cardPlayed: string | null,
    playedBy: string
) => void;
@ObjectType()
export class Game {
    static games = new Map<string, Game>();

    static get(id: string) {
        return Game.games.get(id);
    }

    static getAll() {
        return Array.from(Game.games.values());
    }
    static remove(id: string) {
        Game.games.delete(id);
    }

    events = new Map<string, Function[]>();

    @Field(() => String)
    id: string;

    @Field(() => [Player])
    players: Player[];

    @Field(() => GameLogs, { nullable: true })
    logs: GameLogs = new GameLogs();

    @Field(() => String)
    turn: string;

    get targets() {
        return [
            this.players[0] as Target,
            this.players[1] as Target,
            ...(this.players[0].playField.cards as Target[]),
            ...(this.players[1].playField.cards as Target[]),
        ];
    }

    regesterEvent(event: string, callback: EventCallback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    async emitEvent(event: string, ...args: Parameters<EventCallback>) {
        if (this.events.has(event)) {
            for (const callback of this.events.get(event)!) {
                await callback(...args);
            }
        }
    }

    endTurn() {
        const { otherPlayer } = this.getActingAndOtherPlayer(this.turn);
        this.turn = otherPlayer!.uuid!;
        otherPlayer.startTurn();
    }

    getPlayerByAccountId(accountId: number) {
        return this.players.find((p) => p.account.id === accountId);
    }

    getPlayer(playerId: string) {
        return this.players.find((p) => p.uuid === playerId);
    }

    getActingAndOtherPlayer(playerId: string) {
        const actingPlayer = this.getPlayer(playerId);
        const otherPlayer = this.players.find((p) => p !== actingPlayer);
        if (!actingPlayer) {
            console.log('No player found');
            throw new Error('No player found');
        }
        if (!otherPlayer) {
            console.log('No other player found');
            throw new Error('No other player found');
        }
        return { actingPlayer, otherPlayer };
    }

    async executeAction(playerId: string, code: ParsedCode, cardId: string) {
        await Interpreter.interpret(code, this, playerId, cardId);
    }

    async executeRawCode(code: string, playerId: string) {
        await this.executeAction(playerId, Interpreter.parseCode(code), '');
    }

    constructor(player1: PlayerInput, player2: PlayerInput) {
        if (!player1 || !player2) {
            return;
        }
        this.id = nanoid();
        const p1 = new Player(player1.deckTemplate, player1.account, this.id);
        const p2 = new Player(player2.deckTemplate, player2.account, this.id);

        this.players = [p1, p2];

        //Decide who goes first
        const first = Math.floor(Math.random() * 2);
        this.turn = this.players[first].uuid;
        this.logs.push(`${this.players[first].account.userName} goes first.`);
        this.players[first].startTurn();

        //Draw cards
        this.executeAction(p1.uuid, Interpreter.parseCode('DRAW SELF 3;'), '');
        this.executeAction(p2.uuid, Interpreter.parseCode('DRAW SELF 3;'), '');
    }

    static create(player1: PlayerInput, player2: PlayerInput) {
        const game = new Game(player1, player2);
        Game.games.set(game.id, game);
        return game;
    }

    static async publishGame(game: Game) {
        await pubsub.publish(`watchPublicGame_${game.id}`, {
            publicGame: game,
        });
        await pubsub.publish(`watchPrivateGame_${game.id}`, {
            privateGame: game,
        });
    }
}

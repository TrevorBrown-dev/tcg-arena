import { nanoid } from 'nanoid';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player/Player';
import { pubsub } from '..';
import { GameLogs } from './GameLogs';
import { Interpreter } from '../interpreter/Interpreter';
import { Target } from './utils/Target';

//create a class decorator that will inject a property called id
type PlayerInput = {
    deckTemplate: DeckTemplate;
    account: Account;
};
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

    @Field(() => String)
    id: string = nanoid();

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

    endTurn() {
        const { otherPlayer } = this.getActingAndOtherPlayer(this.turn);
        this.turn = otherPlayer!.uuid!;
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
        return { actingPlayer, otherPlayer };
    }

    async executeAction(playerId: string, action: string, cardId?: string) {
        if (cardId) {
            await Interpreter.interpret(action, this, playerId, cardId);
        } else {
            await Interpreter.interpret(action, this, playerId);
        }
    }

    constructor(player1: PlayerInput, player2: PlayerInput) {
        if (!player1 || !player2) {
            return;
        }
        const p1 = new Player(player1.deckTemplate, player1.account);
        const p2 = new Player(player2.deckTemplate, player2.account);

        this.players = [p1, p2];

        //Decide who goes first
        const first = Math.floor(Math.random() * 2);
        this.turn = this.players[first].uuid;
        this.logs.push(`${this.players[first].account.userName} goes first.`);

        //Draw cards
        this.executeAction(p1.uuid, 'DRAW SELF 3;');
        this.executeAction(p2.uuid, 'DRAW SELF 3;');
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

import { nanoid } from 'nanoid';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';
import { pubsub } from '..';
import { GameLogs } from './GameLogs';
import { Interpreter } from '../interpreter/Interpreter';

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

    getPlayerByAccountId(accountId: number) {
        return this.players.find((p) => p.account.id === accountId);
    }

    getPlayer(playerId: string) {
        return this.players.find((p) => p.id === playerId);
    }

    executeAction(playerId: string, action: string) {
        Interpreter.interpret(action, this, playerId);
    }

    constructor(player1: PlayerInput, player2: PlayerInput) {
        if (!player1 || !player2) {
            return;
        }
        console.log(player1, player2);
        const p1 = new Player(player1.deckTemplate, player1.account);
        const p2 = new Player(player2.deckTemplate, player2.account);

        this.players = [p1, p2];
        p1.drawCards(3);
        p2.drawCards(3);
        // this.executeAction(p1.id, 'DRAW SELF 3;');
        // this.executeAction(p2.id, 'DRAW SELF 3;');
    }

    static create(player1: PlayerInput, player2: PlayerInput) {
        const game = new Game(player1, player2);
        Game.games.set(game.id, game);
        return game;
    }

    static async publishGame(game: Game) {
        console.log('publishing public game');
        await pubsub.publish(`watchPublicGame_${game.id}`, {
            publicGame: game,
        });
        console.log('publishing private game');

        await pubsub.publish(`watchPrivateGame_${game.id}`, {
            privateGame: game,
        });
    }
}

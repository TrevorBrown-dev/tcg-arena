import { nanoid } from 'nanoid';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';
import { pubsub } from '..';

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

    @Field(() => String)
    id: string = nanoid();

    @Field(() => [Player])
    players: Player[];

    static remove(id: string) {
        Game.games.delete(id);
    }

    get player1(): Player {
        return this.players[0];
    }

    get player2(): Player {
        return this.players[1];
    }

    getPlayer(playerId: number) {
        return this.players.find((p) => p.account.id === playerId);
    }

    constructor(player1: PlayerInput, player2: PlayerInput) {
        const p1 = new Player(player1.deckTemplate, player1.account);
        const p2 = new Player(player2.deckTemplate, player2.account);

        this.players = [p1, p2];
        this.player1.drawCards(3);
        this.player2.drawCards(3);
    }

    static create(player1: PlayerInput, player2: PlayerInput) {
        const game = new Game(player1, player2);
        Game.games.set(game.id, game);
        return game;
    }

    static publishGame(game: Game) {
        pubsub.publish(`watchPublicGame_${game.id}`, {
            publicGame: game,
        });
        pubsub.publish(`watchPrivateGame_${game.id}`, {
            privateGame: game,
        });
        pubsub.publish(`watchPrivateGame_${game.id}`, {
            privateGame: game,
        });
    }
}

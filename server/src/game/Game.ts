import { nanoid } from 'nanoid';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';

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

    @Field(() => Player)
    player1: Player;

    @Field(() => Player)
    player2: Player;

    constructor(player1: PlayerInput, player2: PlayerInput) {
        this.player1 = new Player(player1.deckTemplate, player1.account);
        this.player2 = new Player(player2.deckTemplate, player2.account);

        Game.games.set(this.id, this);
    }
}

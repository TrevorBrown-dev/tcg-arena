import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';

@ObjectType()
export class PreGamePlayer {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => DeckTemplate, { nullable: true })
    deckTemplate: DeckTemplate | null = null;

    @Field(() => Account)
    account: Account;

    @Field(() => Boolean)
    ready: boolean = false;

    setReady() {
        if (this.deckTemplate) {
            this.ready = true;
        }
    }

    constructor(account: Account) {
        this.account = account;
    }

    chooseDeck(deckTemplate: DeckTemplate) {
        this.deckTemplate = deckTemplate;
    }
}

@ObjectType()
export class PreGameLobby {
    static preGameLobbies = new Map<string, PreGameLobby>();

    static get(id: string) {
        return PreGameLobby.preGameLobbies.get(id);
    }

    static getAll() {
        return Array.from(PreGameLobby.preGameLobbies.values());
    }

    static remove(id: string) {
        PreGameLobby.preGameLobbies.delete(id);
    }

    @Field(() => String)
    id: string = nanoid();

    @Field(() => [PreGamePlayer])
    players: PreGamePlayer[];

    @Field(() => PreGamePlayer)
    get player1() {
        return this.players[0];
    }

    @Field(() => PreGamePlayer)
    get player2() {
        return this.players[1];
    }

    @Field(() => Boolean)
    get ready() {
        return this.players.every((player) => player.ready);
    }

    constructor(player1: Account, player2: Account) {
        this.players = [new PreGamePlayer(player1), new PreGamePlayer(player2)];
        PreGameLobby.preGameLobbies.set(this.id, this);
    }

    static chooseDeck(player: PreGamePlayer, deckTemplate: DeckTemplate) {
        PreGameLobby.chooseDeck(player, deckTemplate);
    }
}

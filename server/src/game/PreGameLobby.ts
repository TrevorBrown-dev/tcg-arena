import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Game } from './Game';

@ObjectType()
export class PreGamePlayer {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => DeckTemplate)
    deckTemplate: DeckTemplate;

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

    @Field(() => String, { nullable: true })
    gameId?: string;

    constructor(player1: Account, player2: Account) {
        this.players = [new PreGamePlayer(player1), new PreGamePlayer(player2)];
    }

    static leave(lobbyId: string, accountId: number) {
        const preGameLobby = PreGameLobby.get(lobbyId);
        if (!preGameLobby) return;
        preGameLobby.players = preGameLobby.players.filter(
            (player) => player.account.id !== accountId
        );
        setTimeout(() => {
            const preGameLobby = PreGameLobby.get(lobbyId);
            if (!preGameLobby) return;
            if (preGameLobby.players.length === 0) {
                PreGameLobby.remove(preGameLobby.id);
            }
        }, 5000);
    }

    static create(player1: Account, player2: Account) {
        const lobby = new PreGameLobby(player1, player2);
        PreGameLobby.preGameLobbies.set(lobby.id, lobby);
        return lobby;
    }

    static chooseDeck(player: PreGamePlayer, deckTemplate: DeckTemplate) {
        PreGameLobby.chooseDeck(player, deckTemplate);
    }

    static startGame(preGameLobby: PreGameLobby) {
        if (!preGameLobby.players) return;

        if (!preGameLobby.ready) return;
        if (!preGameLobby.players.every((player) => !!player.deckTemplate))
            return;
        const game = Game.create(
            {
                account: preGameLobby.player1.account,
                deckTemplate: preGameLobby?.player1?.deckTemplate,
            },
            {
                account: preGameLobby.player2.account,
                deckTemplate: preGameLobby?.player2?.deckTemplate,
            }
        );
        preGameLobby.gameId = game.id;
        return game;
    }
}

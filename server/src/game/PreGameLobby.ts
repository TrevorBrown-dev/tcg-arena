import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Game } from './Game';

@ObjectType()
export class AccountInfo {
    @Field(() => Number)
    id: number;
    @Field(() => String)
    userName: string;
}
@ObjectType()
export class PreGamePlayer {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => DeckTemplate)
    deckTemplate: DeckTemplate;

    @Field(() => AccountInfo)
    account: AccountInfo;

    @Field(() => Boolean)
    ready: boolean = false;

    setReady() {
        if (this.deckTemplate) {
            this.ready = true;
        }
    }

    constructor(account: AccountInfo) {
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

    constructor(player1: AccountInfo, player2: AccountInfo) {
        this.players = [new PreGamePlayer(player1), new PreGamePlayer(player2)];
    }
    static create(player1: AccountInfo, player2: AccountInfo) {
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
        console.log('RUNNING START GAME FOR SOME REASON', preGameLobby.id);
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

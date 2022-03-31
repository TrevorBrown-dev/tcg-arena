import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
import { DeckTemplate } from '../entities/DeckTemplate';
import { PreGameLobby } from '../game/PreGameLobby';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class PreGameLobbyResolver {
    @Query(() => [PreGameLobby])
    async preGameLobbies(): Promise<PreGameLobby[]> {
        return PreGameLobby.getAll();
    }

    @Mutation(() => PreGameLobby)
    async selectDeck(
        @Arg('preGameLobbyId') preGameLobbyId: string,
        @Arg('deckTemplateId') deckTemplateId: number,
        @Ctx() { req: { req } }: MyContext
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('No authorization cookie found');
        const account = parseJWT(authorization);
        if (!account || !account?.id) {
            throw new Error(
                `No account found with cookie ${authorization} and payload response`
            );
        }
        const myId = account.id;
        const lobby = PreGameLobby.get(preGameLobbyId);
        if (!lobby)
            throw new Error(
                `PreGameLobby not found with id: ${preGameLobbyId}`
            );
        const myPlayer = lobby.players.find((player) => player.id === myId);
        if (!myPlayer)
            throw new Error(
                `Player not found with id: ${myId} in PreGameLobby with id: ${preGameLobbyId}`
            );
        const deckTemplate = await DeckTemplate.findOne({
            where: {
                id: deckTemplateId,
                cardLibrary: {
                    account: myId,
                },
            },
            relations: ['cards', 'cardLibrary', 'cardLibrary.account'],
        });
        if (!deckTemplate)
            throw new Error(
                `DeckTemplate not found with id: ${deckTemplateId}`
            );

        myPlayer.chooseDeck(deckTemplate);
        pubsub.publish(`preGameLobby_${preGameLobbyId}`, {
            preGameLobby: lobby,
        });
    }

    @Mutation(() => PreGameLobby)
    async readyUp(
        @Arg('preGameLobbyId') preGameLobbyId: string,
        @Ctx() { req: { req } }: MyContext
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('No authorization cookie found');
        const account = parseJWT(authorization);
        if (!account || !account?.id) {
            throw new Error(
                `No account found with cookie ${authorization} and payload response`
            );
        }
        const myId = account.id;
        const lobby = PreGameLobby.get(preGameLobbyId);
        if (!lobby)
            throw new Error(
                `PreGameLobby not found with id: ${preGameLobbyId}`
            );
        const myPlayer = lobby.players.find((player) => player.id === myId);
        if (!myPlayer)
            throw new Error(
                `Player not found with id: ${myId} in PreGameLobby with id: ${preGameLobbyId}`
            );
        myPlayer.setReady();
        if (!myPlayer.ready) {
            throw new Error(`You can't ready up until you choose a deck.`);
        }
        pubsub.publish(`watchPreGameLobby_${preGameLobbyId}`, {
            preGameLobby: lobby,
        });
        return lobby;
    }

    @Subscription(() => PreGameLobby, {
        topics: ({ args }) => {
            setTimeout(() => {
                const lobby = PreGameLobby.get(args.id);
                if (!lobby)
                    console.log(`PreGameLobby not found with id: ${args.id}`);
                pubsub.publish(`preGameLobby_${args.id}`, {
                    preGameLobby: lobby,
                });
            }, 1);
            return `watchPreGameLobby_${args.id}`;
        },
    })
    async watchPreGameLobby(
        @Root('preGameLobby') preGameLobby: PreGameLobby,
        @Arg('id') id: string
    ) {
        return preGameLobby;
    }
}

export default PreGameLobbyResolver;

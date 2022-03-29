import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
import { Account } from '../entities/Account';
import { Lobby } from '../entities/Lobby';

@Resolver()
class LobbyResolver {
    @Query(() => [Lobby])
    async lobbies() {
        return Lobby.find();
    }

    @Mutation(() => Lobby)
    async createLobby(@Arg('creatorId') creatorId: number) {
        const lobby = await Lobby.create().save();
        await lobby.save();
        console.log(`Lobby ${lobby.id} created`);
        return lobby;
    }

    @Mutation(() => Lobby)
    async joinLobby(
        @Arg('id') id: string,
        @Arg('accountId') accountId: number
    ): Promise<Lobby> {
        const lobby = await Lobby.create({
            members: [],
        });
        return lobby;
    }

    @Mutation(() => Lobby)
    async leaveLobby(
        @Arg('id') id: string,
        @Arg('accountId') accountId: number
    ): Promise<Boolean> {
        return await Lobby.leaveLobby(id, accountId);
    }

    @Subscription(() => Lobby, {
        topics: ({ args }) => {
            setTimeout(async () => {
                const lobby = await Lobby.joinLobby(args.id, args.accountId);
                pubsub.publish(`watchLobby_${args.id}`, { lobby });
            }, 1);
            return `watchLobby_${args.id}`;
        },
        filter: ({ args }) => {
            return true;
        },
    })
    watchLobby(
        @Root('lobby') lobby: Lobby,
        @Arg('id') id: string,
        @Arg('accountId') accountId: number
    ) {
        return lobby;
    }
}
export default LobbyResolver;

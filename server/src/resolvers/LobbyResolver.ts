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
import { Account } from '../entities/Account';
import { Lobby } from '../entities/Lobby';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

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
        topics: ({ args, context }) => {
            try {
                const cookie = context.extra.request?.headers?.cookie;
                const account = parseJWT(cookie);
                if (!account || !account?.id) {
                    console.log(
                        `No account found with cookie ${cookie} and payload response:`,
                        account
                    );
                } else {
                    setTimeout(async () => {
                        const lobby = await Lobby.joinLobby(
                            args.id,
                            parseInt(account.id)
                        );
                        if (!lobby) return;
                        pubsub.publish(`watchLobby_${args.id}`, { lobby });
                    }, 1);
                }
            } catch (e) {
                console.log(e);
            }
            return `watchLobby_${args.id}`;
        },
    })
    watchLobby(@Root('lobby') lobby: Lobby, @Arg('id') id: string) {
        return lobby;
    }
}
export default LobbyResolver;

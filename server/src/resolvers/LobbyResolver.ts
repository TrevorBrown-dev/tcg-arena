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

const joinLobbyUtil = async (id: string, accountId: number) => {
    const lobby = await Lobby.findOne({
        where: { id },
        relations: ['members'],
    });

    if (!lobby) throw new Error(`Lobby not found with id: ${id}`);

    const account = await Account.findOne({
        where: { id: accountId },
    });
    if (!account) throw new Error(`Account not found with id: ${accountId}`);
    if (
        lobby.members &&
        lobby.members.find((account) => {
            return account.id === accountId;
        })
    ) {
        //Interesting case I need to figure out handling joining and leaving lobbies
        return lobby;
    }
    lobby.members.push(account);
    account.save();
    console.log('RUNNING');
    await account.save();
    await lobby.save();

    console.log(`Lobby ${id} joined`);
    return lobby;
};
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
        console.log('LEAVING LOBBY');
        const lobby = await Lobby.findOne({
            where: { id },
            relations: ['members'],
        });
        if (!lobby) throw new Error(`Lobby not found with id: ${id}`);
        const account = await Account.findOne({
            where: { id: accountId },
            relations: ['lobby'],
        });
        if (!account)
            throw new Error(`Account not found with id: ${accountId}`);
        if (
            lobby.members &&
            lobby.members.find((account) => {
                return account.id === accountId;
            })
        ) {
            //Interesting case I need to figure out handling joining and leaving lobbies
            console.log('ABOUT TO LEAVE', lobby.id);
            lobby.members = lobby.members.filter(
                (account) => account.id !== accountId
            );
            await account.save();
            await lobby.save();
            if (lobby.members.length === 0) {
                await lobby.remove();
            } else {
                console.log(lobby);
                pubsub.publish(`watchLobby_${lobby.id}`, { lobby });
            }

            return true;
        }

        return false;
    }

    @Subscription(() => Lobby, {
        topics: ({ args }) => {
            setTimeout(async () => {
                const lobby = await joinLobbyUtil(args.id, args.accountId);
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

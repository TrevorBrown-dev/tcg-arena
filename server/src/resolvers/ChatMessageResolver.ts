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
import { ChatMessage } from '../entities/ChatMessage';
import { Lobby } from '../entities/Lobby';
import { MyContext } from '../types';
import { getAccountIdFromCookie } from '../utils/auth/getAccountFromCookie';

@Resolver()
class ChatMessageResolver {
    @Query(() => [ChatMessage])
    async chatMessages() {
        return await ChatMessage.find();
    }

    @Mutation(() => ChatMessage)
    async createChatMessage(
        @Arg('message') message: string,
        @Arg('lobbyId') lobbyId: string,
        @Ctx() { req: { req } }: MyContext
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('Not authenticated');
        const accountId = await getAccountIdFromCookie(authorization);
        if (!accountId) throw new Error('No account found');
        const account = await Account.findOne({
            where: { id: accountId },
        });
        const lobby = await Lobby.findOne({
            where: { id: lobbyId },
            relations: ['chatMessages', 'chatMessages.account'],
        });
        if (!lobby) throw new Error(`Lobby not found with id: ${lobbyId}`);

        const chatMessage = ChatMessage.create({
            message,
            account,
        });

        await chatMessage.save();
        lobby.chatMessages.push(chatMessage);
        await lobby.save();
        pubsub.publish(`watchChat_${lobby.id}`, {
            messages: lobby.chatMessages,
        });
        return chatMessage;
    }

    @Subscription(() => [ChatMessage], {
        topics: ({ args }) => `watchChat_${args.lobbyId}`,
    })
    async watchChat(
        @Arg('lobbyId') lobbyId: string,
        @Root('messages') messages: ChatMessage[]
    ) {
        return messages;
    }
}

export default ChatMessageResolver;

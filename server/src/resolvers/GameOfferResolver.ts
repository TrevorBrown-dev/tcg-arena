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
import { GameOffer } from '../game/GameOffer';
import { PreGameLobby } from '../game/PreGameLobby';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class GameOfferResolver {
    @Query(() => [GameOffer])
    async gameOffers() {
        return GameOffer.getAll();
    }

    @Query(() => GameOffer)
    async gameOffer(@Arg('id') id: string) {
        return GameOffer.get(id);
    }

    @Mutation(() => GameOffer)
    async createGameOffer(
        @Ctx() { req: { req } }: MyContext,
        @Arg('recipientId') recipientId: number
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('No authorization cookie found');
        const account = parseJWT(authorization);
        if (!account || !account?.id) {
            throw new Error(
                `No account found with cookie ${authorization} and payload response`
            );
        }
        const issuerId = account.id;
        const issuer = await Account.findOne(issuerId);
        const recipient = await Account.findOne(recipientId);
        if (!issuer || !recipient)
            throw new Error(
                `Accounts not found with ids : ${issuerId}, ${recipientId}`
            );
        const offer = new GameOffer(issuer, recipient);
        pubsub.publish(`gameOfferInbox_${recipient.id}`, { gameOffer: offer });
        return offer;
    }

    @Mutation(() => GameOffer)
    async acceptGameOffer(@Arg('id') offerId: string) {
        const offer = GameOffer.get(offerId);
        if (!offer) throw new Error(`GameOffer not found with id: ${offerId}`);
        const preGameLobby = new PreGameLobby(offer.issuer, offer.recipient);
        return preGameLobby.id;
    }

    @Subscription(() => GameOffer, {
        topics: ({ context }) => {
            const cookie = context.extra.request?.headers?.cookie;
            const account = parseJWT(cookie);
            if (!account || !account?.id) {
                console.log(
                    `No account found with cookie ${cookie} and payload response:`,
                    account
                );
            }
            setTimeout(() => {
                pubsub.publish(`gameOfferInbox_${account.id}`, {
                    gameOffers: GameOffer.getAll(parseInt(account.id)),
                });
            }, 1);
            return `gameOfferInbox_${account.id}`;
        },
    })
    async gameOfferInbox(@Root('gameOffers') gameOffers: GameOffer) {
        return gameOffers;
    }
}

export default GameOfferResolver;

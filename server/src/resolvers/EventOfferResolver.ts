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
import { EventOffer, EventOfferType } from '../game/EventOffer';
import { PreGameLobby } from '../game/PreGameLobby';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class EventOfferResolver {
    @Query(() => [EventOffer])
    async eventOffers(@Arg('accountId', { nullable: true }) accountId: number) {
        const offers = EventOffer.getAll(accountId);
        return offers;
    }

    @Query(() => EventOffer)
    async eventOffer(@Arg('id') id: string) {
        return EventOffer.get(id);
    }

    @Mutation(() => EventOffer)
    async createOffer(
        @Ctx() { req: { req } }: MyContext,
        @Arg('recipientFriendCode') recipientFriendCode: string,
        @Arg('type') type: EventOfferType
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('No authorization cookie found');
        const account = parseJWT(authorization);
        if (!account || !account?.id) {
            console.log('errorrr');
            throw new Error(
                `No account found with cookie ${authorization} and payload response`
            );
        }
        const issuerId = account.id;
        const issuer = await Account.findOne(issuerId);
        const recipient = await Account.findOne({
            where: { friendCode: recipientFriendCode },
        });
        if (!issuer || !recipient) {
            console.log('no issue');
            throw new Error(
                `Accounts not found with ids : ${issuerId}, ${recipientFriendCode}`
            );
        }

        const offer = EventOffer.createEventOffer(issuer, recipient, type);

        return offer;
    }

    @Mutation(() => EventOffer)
    async acceptOffer(@Arg('id') offerId: string) {
        const offer = EventOffer.get(offerId);
        if (!offer) throw new Error(`EventOffer not found with id: ${offerId}`);
        const lobbyId = EventOffer.initiateEvent(offer);
        if (!lobbyId) throw new Error(`Could not initiate event`);

        return lobbyId;
    }

    @Mutation(() => EventOffer)
    async declineOffer(@Arg('id') offerId: string) {
        const offer = EventOffer.get(offerId);
        if (!offer) throw new Error(`EventOffer not found with id: ${offerId}`);
        EventOffer.declineOffer(offer);
        pubsub.publish(`eventOfferInbox_${offer.recipient.id}`, {
            eventOffer: offer,
        });
        pubsub.publish(`eventOfferInbox_${offer.issuer.id}`, {
            eventOffer: offer,
        });
        return offer;
    }

    @Subscription(() => EventOffer, {
        topics: ({ context }) => {
            const { accountId } = context;
            if (!accountId) {
                console.log(
                    `No accountId found in context for eventOfferInbox_${accountId}`
                );
            }
            return `eventOfferInbox_${accountId}`;
        },
    })
    async eventOfferInbox(@Root('eventOffer') eventOffer: EventOffer) {
        return eventOffer;
    }
}

export default EventOfferResolver;

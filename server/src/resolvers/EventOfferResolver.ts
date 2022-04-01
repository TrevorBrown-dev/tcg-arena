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
        @Arg('recipientId') recipientId: number,
        @Arg('type') type: EventOfferType
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
        const offer = EventOffer.createEventOffer(issuer, recipient, type);
        pubsub.publish(`eventOfferInbox_${issuerId}`, {
            eventOffer: offer,
        });
        pubsub.publish(`eventOfferInbox_${recipient.id}`, {
            eventOffer: offer,
        });
        return offer;
    }

    @Mutation(() => EventOffer)
    async acceptOffer(@Arg('id') offerId: string) {
        const offer = EventOffer.get(offerId);
        if (!offer) throw new Error(`EventOffer not found with id: ${offerId}`);
        const lobbyId = EventOffer.initiateEvent(offer);
        if (!lobbyId) throw new Error(`Could not initiate event`);
        pubsub.publish(`eventOfferInbox_${offer.recipient.id}`, {
            eventOffer: offer,
        });
        pubsub.publish(`eventOfferInbox_${offer.issuer.id}`, {
            eventOffer: offer,
        });
        return lobbyId;
    }

    @Subscription(() => EventOffer, {
        topics: ({ context }) => {
            const cookie = context.extra.request?.headers?.cookie;
            const account = parseJWT(cookie);
            if (!account || !account?.id) {
                console.log(
                    `No account found with cookie ${cookie} and payload response:`,
                    account
                );
            }
            return `eventOfferInbox_${account.id}`;
        },
    })
    async eventOfferInbox(@Root('eventOffer') eventOffer: EventOffer) {
        return eventOffer;
    }
}

export default EventOfferResolver;

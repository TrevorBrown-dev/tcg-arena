import { nanoid } from 'nanoid';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { pubsub } from '..';
import { Account } from '../entities/Account';
import { PreGameLobby } from './PreGameLobby';

export enum EventOfferType {
    GAME = 'GAME',
    TRADE = 'TRADE',
    FRIEND_REQUEST = 'FRIEND_REQUEST',
}

export enum EventOfferStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
registerEnumType(EventOfferStatus, {
    name: 'EventOfferStatus',
});

registerEnumType(EventOfferType, {
    name: 'EventOfferType',
});

@ObjectType()
export class EventOffer {
    static eventOffers = new Map<string, EventOffer>();

    static get(id: string) {
        return EventOffer.eventOffers.get(id);
    }

    static getAll(accountId?: number) {
        if (accountId) {
            return Array.from(EventOffer.eventOffers.values()).filter(
                (offer) =>
                    offer.recipient.id === accountId ||
                    offer.issuer.id === accountId
            );
        }
        return Array.from(EventOffer.eventOffers.values());
    }

    static remove(id: string) {
        EventOffer.eventOffers.delete(id);
    }

    @Field(() => String)
    id: string = nanoid();

    @Field(() => Account)
    issuer: Account;

    @Field(() => Account)
    recipient: Account;

    @Field(() => EventOfferType)
    type: EventOfferType;

    @Field(() => EventOfferStatus)
    status: EventOfferStatus = EventOfferStatus.PENDING;

    @Field(() => String, { nullable: true })
    lobbyId?: string;

    ttl: number = 60 * 1000;

    accept() {
        this.status = EventOfferStatus.ACCEPTED;
        const preGameLobby = PreGameLobby.create(this.issuer, this.recipient);
        //! need to publish to both players when that is implemented
        //? Maybe not here though
        return preGameLobby;
    }
    constructor(
        issuer: Account,
        recipient: Account,
        type: EventOfferType = EventOfferType.GAME
    ) {
        this.issuer = issuer;
        this.recipient = recipient;
        this.type = type;
    }

    static createEventOffer(
        issuer: Account,
        recipient: Account,
        type: EventOfferType = EventOfferType.GAME
    ) {
        const event = new EventOffer(issuer, recipient, type);
        EventOffer.eventOffers.set(event.id, event);
        pubsub.publish(`eventOfferInbox_${event.issuer.id}`, {
            eventOffer: event,
        });
        pubsub.publish(`eventOfferInbox_${event.recipient.id}`, {
            eventOffer: event,
        });
        return event;
    }

    /**
     *
     * @param eventOffer the event that is being offered
     * @returns the id of the lobby that was created
     */
    static initiateEvent(eventOffer: EventOffer) {
        switch (eventOffer.type) {
            case EventOfferType.GAME:
                const lobbyId = eventOffer.accept().id;
                eventOffer.lobbyId = lobbyId;
                pubsub.publish(`eventOfferInbox_${eventOffer.recipient.id}`, {
                    eventOffer,
                });
                pubsub.publish(`eventOfferInbox_${eventOffer.issuer.id}`, {
                    eventOffer,
                });
                EventOffer.remove(eventOffer.id);
                return lobbyId;
            case EventOfferType.TRADE:
                return eventOffer.accept().id;
            case EventOfferType.FRIEND_REQUEST:
                return eventOffer.accept().id;
            default:
                return null;
        }
    }

    static declineOffer(offer: EventOffer) {
        offer.status = EventOfferStatus.REJECTED;
        EventOffer.remove(offer.id);
        return offer;
    }
}

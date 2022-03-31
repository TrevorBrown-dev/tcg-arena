import { nanoid } from 'nanoid';
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Account } from '../entities/Account';
import { PreGameLobby } from './PreGameLobby';

export enum GameOfferStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}
registerEnumType(GameOfferStatus, {
    name: 'GameOfferStatus',
});

@ObjectType()
export class GameOffer {
    static gameOffers = new Map<string, GameOffer>();

    static get(id: string) {
        return GameOffer.gameOffers.get(id);
    }

    static getAll(accountId?: number) {
        if (accountId) {
            return Array.from(GameOffer.gameOffers.values()).filter(
                (offer) =>
                    offer.recipient.id === accountId ||
                    offer.issuer.id === accountId
            );
        }
        return Array.from(GameOffer.gameOffers.values());
    }

    static remove(id: string) {
        GameOffer.gameOffers.delete(id);
    }

    @Field(() => String)
    id: string = nanoid();

    @Field(() => Account)
    issuer: Account;

    @Field(() => Account)
    recipient: Account;

    @Field(() => GameOfferStatus)
    status: GameOfferStatus = GameOfferStatus.PENDING;

    accept() {
        this.status = GameOfferStatus.ACCEPTED;
        const preGameLobby = new PreGameLobby(this.issuer, this.recipient);
        //! need to publish to both players when that is implemented
        //? Maybe not here though
        return preGameLobby;
    }
    constructor(issuer: Account, recipient: Account) {
        this.issuer = issuer;
        this.recipient = recipient;

        GameOffer.gameOffers.set(this.id, this);
    }

    static issueOffer(issuer: Account, recipient: Account) {
        const offer = new GameOffer(issuer, recipient);
    }
}

import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { CardObj } from './Card';

@ObjectType()
export class Hand {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[];

    @Field(() => Number)
    get numCardsInHand(): number {
        return this.cards.length;
    }

    constructor(cards: CardObj[] = []) {
        this.cards = cards;
    }

    findCard(uuid: string) {
        return this.cards.find((card) => card.uuid === uuid);
    }

    findCards(uuids: string[]) {
        return this.cards.filter((card) => uuids.includes(card.uuid));
    }

    static addCardsToHand(hand: Hand, cards: CardObj[]) {
        hand.cards = [...hand.cards, ...cards];
        return hand;
    }

    static removeCardsFromHand(hand: Hand, cards: CardObj[]) {
        hand.cards = hand.cards.filter(
            (card) => !cards.some((c) => c.uuid === card.uuid)
        );
        return hand;
    }
}

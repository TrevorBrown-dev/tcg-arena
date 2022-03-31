import { Field, ObjectType } from 'type-graphql';
import { CardObj } from './Card';

@ObjectType()
export class Hand {
    @Field(() => [CardObj])
    cards: CardObj[];

    constructor(cards: CardObj[] = []) {
        this.cards = cards;
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

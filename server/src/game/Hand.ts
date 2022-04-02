import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { CardObj } from './Card';
import { WithCards } from './utils/WithCards';

@ObjectType()
export class Hand implements WithCards {
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

    addCards(cards: CardObj[]): void {
        this.cards = [...this.cards, ...cards];
    }

    removeCards(cards: CardObj[]) {
        this.cards = this.cards.filter((card) => !cards.includes(card));
    }

    static addCardsToHand(hand: Hand, cards: CardObj[]) {
        hand.addCards(cards);
        return hand;
    }

    static removeCardsFromHand(hand: Hand, cards: CardObj[]) {
        hand.removeCards(cards);
        return hand;
    }
}

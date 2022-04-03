import { CardObj } from './Card';
import { Field, ObjectType } from 'type-graphql';
import { DeckTemplate } from '../entities/DeckTemplate';
import { shuffleArray } from '../utils/shuffleArray';
import { Hand } from './Hand';
import { nanoid } from 'nanoid';
import { WithCards } from './utils/WithCards';

@ObjectType()
export class Deck implements WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    @Field(() => Number)
    get numCardsInDeck(): number {
        return this.cards.length;
    }

    constructor() {}

    static create(template: DeckTemplate) {
        const deck = new Deck();
        deck.cards = DeckTemplate.loadCardsFromTemplate(template);
        deck.cards = shuffleArray(deck.cards);
        return deck;
    }

    static drawFromDeck(deck: Deck, hand: Hand, numCards: number = 1) {
        const cards = deck.draw(numCards);
        Hand.addCardsToHand(hand, cards);
        return deck;
    }

    addCards(cards: CardObj[]): void {
        this.cards = [...this.cards, ...cards];
    }

    removeCards(cards: CardObj[]) {
        this.cards = this.cards.filter((card) => !cards.includes(card));
    }

    draw(numCards: number = 1) {
        const drawnCards = this.cards.splice(0, numCards);
        return drawnCards;
    }

    static addCardsToDeckFromHand(
        deck: Deck,
        hand: Hand,
        cards: CardObj[],
        shuffle: boolean = false
    ) {
        Hand.removeCardsFromHand(hand, cards);
        deck.replace(cards);
        if (shuffle) {
            deck.shuffle();
        }
        return deck;
    }

    shuffle() {
        this.cards = shuffleArray(this.cards);
    }

    replace(cards: CardObj[]) {
        this.cards = [...cards, ...this.cards];
    }
}

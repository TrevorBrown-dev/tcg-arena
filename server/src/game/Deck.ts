import { CardObj } from './Card';
import { Field, ObjectType } from 'type-graphql';
import { DeckTemplate } from '../entities/DeckTemplate';
import { shuffleArray } from '../utils/shuffleArray';
import { Hand } from './Hand';

@ObjectType()
export class Deck {
    @Field(() => [CardObj], { nullable: true })
    deck: CardObj[];

    @Field(() => DeckTemplate, { nullable: true })
    template: DeckTemplate;

    constructor(template: DeckTemplate) {
        this.template = template;
        this.deck = DeckTemplate.loadCardsFromTemplate(this.template);
        this.deck = shuffleArray(this.deck);
    }

    static drawFromDeck(deck: Deck, hand: Hand, numCards: number = 1) {
        const cards = deck.draw(numCards);
        Hand.addCardsToHand(hand, cards);
        return deck;
    }

    draw(numCards: number = 1) {
        const drawnCards = this.deck.splice(0, numCards);
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
        this.deck = shuffleArray(this.deck);
    }

    replace(cards: CardObj[]) {
        this.deck = [...cards, ...this.deck];
    }
}

import { Field, ObjectType } from 'type-graphql';
import { DeckTemplate } from '../../entities/DeckTemplate';
import { shuffleArray } from '../../utils/shuffleArray';
import { nanoid } from 'nanoid';
import { WithCards } from '../utils/WithCards';
import { Hand } from './Hand';
import { CardObj } from './Card';

@ObjectType()
export class Deck extends WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    @Field(() => Number)
    get numCardsInDeck(): number {
        return this.cards.length;
    }

    constructor() {
        super();
    }

    static create(template: DeckTemplate) {
        const deck = new Deck();
        deck.cards = DeckTemplate.loadCardsFromTemplate(template);
        deck.cards = shuffleArray(deck.cards);
        return deck;
    }

    shuffle() {
        this.cards = shuffleArray(this.cards);
    }

    replace(cards: CardObj[]) {
        this.addCards(cards);
    }
}

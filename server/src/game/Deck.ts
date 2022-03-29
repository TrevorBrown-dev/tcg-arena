import { Field, ObjectType } from 'type-graphql';
import { Card } from '../entities/Card';
import { DeckTemplate } from '../entities/DeckTemplate';
import { shuffleArray } from '../utils/shuffleArray';

@ObjectType()
export class Deck {
    @Field(() => [Card], { nullable: true })
    private deck: Card[];

    @Field(() => DeckTemplate, { nullable: true })
    get template() {
        return this._template;
    }

    constructor(private _template: DeckTemplate) {
        this.deck = this._template.loadCardsFromTemplate();
        this.deck = shuffleArray(this.deck);
    }

    draw(numCards: number) {
        const drawnCards = this.deck.splice(0, numCards);
        return drawnCards;
    }

    replace(cards: Card[]) {
        this.deck = [...cards, ...this.deck];
    }

    replaceAndShuffle(cards: Card[]) {
        this.deck = [...cards, ...this.deck];
        this.deck = shuffleArray(this.deck);
    }
}

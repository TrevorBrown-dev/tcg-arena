import { Field, ObjectType } from 'type-graphql';
import { DeckTemplate } from '../../entities/DeckTemplate';
import { shuffleArray } from '../../utils/shuffleArray';
import { nanoid } from 'nanoid';
import { WithCards } from '../utils/WithCards';
import { Hand } from './Hand';
import { CardObj } from './Card';
import { Game } from '../Game';

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

    game: string;

    constructor(gameId: string) {
        super();
        this.game = gameId;
    }

    static create(template: DeckTemplate, gameId: string) {
        const deck = new Deck(gameId);
        deck.cards = DeckTemplate.loadCardsFromTemplate(template);
        deck.cards = shuffleArray(deck.cards);
        return deck;
    }

    shuffle() {
        this.cards = shuffleArray(this.cards);
        Game.get(this.game)?.emitEvent('SHUFFLE');
    }

    replace(cards: CardObj[]) {
        this.addCards(cards);
        Game.get(this.game)?.emitEvent('REPLACE');
    }
}

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

    owner: string;

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    @Field(() => Number)
    get numCardsInDeck(): number {
        return this.cards.length;
    }

    game: string;

    constructor(gameId: string, owner: string) {
        super();
        this.game = gameId;
        this.owner = owner;
    }

    static create(template: DeckTemplate, gameId: string, owner: string) {
        const deck = new Deck(gameId, owner);
        deck.cards = DeckTemplate.loadCardsFromTemplate(template);
        deck.cards = shuffleArray(deck.cards);
        return deck;
    }

    shuffle() {
        this.cards = shuffleArray(this.cards);
        Game.get(this.game)?.emitEvent('SHUFFLE', null, this.id);
    }

    replace(cards: CardObj[]) {
        this.addCards(cards);
        Game.get(this.game)?.emitEvent('REPLACE', null, this.id);
    }
}

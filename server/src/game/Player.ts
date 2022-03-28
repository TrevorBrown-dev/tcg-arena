import { Field, ObjectType } from 'type-graphql';
import { Account } from '../entities/Account';
import { Card } from '../entities/Card';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Deck } from './Deck';

@ObjectType()
export class Player {
    @Field(() => Deck)
    private deck: Deck;

    @Field(() => Number)
    get health() {
        return this._health;
    }

    @Field(() => [Card])
    get hand() {
        return this._hand;
    }

    constructor(
        private account: Account,
        private deckTemplate: DeckTemplate,
        private _health: number = 20,
        private _hand: Card[] = []
    ) {
        this.deck = new Deck(this.deckTemplate);
    }

    getDeck() {
        return this.deck;
    }

    getAccount() {
        return this.account;
    }

    getHealth() {
        return this.health;
    }

    incrementHealth(amount: number) {
        this._health += amount;
    }

    decrementHealth(amount: number) {
        this._health -= amount;
    }

    getHand() {
        return this.hand;
    }

    draw(numCards: number) {
        const drawnCards = this.deck.draw(numCards);
        this._hand = [...this._hand, ...drawnCards];
    }

    replace(cards: Card[]) {
        this.deck.replace(cards);
    }

    replaceAndShuffle(cards: Card[]) {
        this.deck.replaceAndShuffle(cards);
    }
}

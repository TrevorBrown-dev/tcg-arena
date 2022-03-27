import { Account } from '../entities/Account';
import { Card } from '../entities/Card';
import { DeckTemplate } from '../entities/DeckTemplate';
import { Deck } from './Deck';

export class Player {
    private deck: Deck;
    constructor(
        private account: Account,
        private deckTemplate: DeckTemplate,
        private health: number = 20,
        private hand: Card[] = []
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
        this.health += amount;
    }

    decrementHealth(amount: number) {
        this.health -= amount;
    }

    getHand() {
        return this.hand;
    }

    draw(numCards: number) {
        const drawnCards = this.deck.draw(numCards);
        this.hand = [...this.hand, ...drawnCards];
    }

    replace(cards: Card[]) {
        this.deck.replace(cards);
    }

    replaceAndShuffle(cards: Card[]) {
        this.deck.replaceAndShuffle(cards);
    }
}

import { CardObj } from '../Card';

export interface WithCards {
    cards: CardObj[];
    addCards(cards: CardObj[]): void;
    removeCards(cards: CardObj[]): void;
}

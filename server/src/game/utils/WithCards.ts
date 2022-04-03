import { CardObj } from '../Player/Card';

export abstract class WithCards {
    abstract cards: CardObj[];
    public addCards(cards: CardObj[]) {
        this.cards = [...this.cards, ...cards];
    }
    public removeCards(cards: string[]): void {
        this.cards = this.cards.filter(
            (card) => !cards.find((uuid) => uuid === card.uuid)
        );
    }
    public getCards(uuids: string[]): CardObj[] {
        return this.cards.filter((card) => uuids.includes(card.uuid));
    }

    public pop(): CardObj | undefined {
        return this.cards.pop();
    }

    public popAndTransfer(amount: number, to: WithCards) {
        const cards = this.cards.splice(this.cards.length - amount, amount);
        if (cards) {
            to.addCards(cards);
        }
    }

    public peek(amount: number): CardObj[] {
        return this.cards.slice(this.cards.length - amount, this.cards.length);
    }

    public transferCards(cards: string[], to: WithCards) {
        to.addCards(this.getCards(cards));
        this.removeCards(cards);
    }
}

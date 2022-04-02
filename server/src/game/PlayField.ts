import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { CardObj } from './Card';
import { WithCards } from './utils/WithCards';

@ObjectType()
export class PlayField implements WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    addCards(cards: CardObj[]): void {
        this.cards = [...this.cards, ...cards];
    }

    removeCards(cards: CardObj[]) {
        this.cards = this.cards.filter((card) => !cards.includes(card));
    }

    playCard(card: CardObj) {
        this.addCards([card]);
    }
}

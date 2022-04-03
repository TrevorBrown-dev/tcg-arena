import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { WithCards } from '../utils/WithCards';
import { CardObj } from './Card';

@ObjectType()
export class Hand extends WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    @Field(() => Number)
    get numCardsInHand(): number {
        return this.cards.length;
    }

    findCards(uuids: string[]) {
        return this.cards.filter((card) => uuids.includes(card.uuid));
    }
    findCard(uuid: string) {
        return this.findCards([uuid])[0];
    }
}

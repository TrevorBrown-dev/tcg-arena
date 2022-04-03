import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { CardObj } from './Card';
import { WithCards } from '../utils/WithCards';

@ObjectType()
export class PlayField extends WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];

    playCard(card: CardObj) {
        this.addCards([card]);
    }
}

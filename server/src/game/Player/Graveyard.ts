import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { WithCards } from '../utils/WithCards';
import { CardObj } from './Card';

@ObjectType()
export class Graveyard extends WithCards {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => [CardObj], { nullable: true })
    cards: CardObj[] = [];
}

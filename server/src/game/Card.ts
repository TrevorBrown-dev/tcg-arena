import { Field, ObjectType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { CardInfo } from '../utils/types/CardTypes';

@ObjectType()
export class CardObj implements CardInfo {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    uuid: string = nanoid();

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;

    @Field(() => String, { nullable: true })
    imageUrl: string;

    @Field(() => String)
    code: string;

    @Field(() => Boolean)
    isFoil: boolean;

    constructor(card: CardInfo, isFoil: boolean) {
        Object.assign(this, card);
        this.isFoil = isFoil;
    }
}

import { Field, ObjectType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { CardInfo } from '../../utils/types/CardTypes';
import { Target } from '../utils/Target';

@ObjectType()
export class CardObj implements CardInfo, Target {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    uuid: string = nanoid();

    @Field(() => Number, { nullable: true })
    health: number;

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

    damage(dmgAmount: number) {
        this.health -= dmgAmount;
    }

    heal(healAmount: number) {
        this.health += healAmount;
    }

    constructor(card: CardInfo, isFoil: boolean) {
        Object.assign(this, card);
        this.isFoil = isFoil;
    }
}

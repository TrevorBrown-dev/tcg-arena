import { Field, ObjectType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { CardInfo } from '../../utils/types/CardTypes';
import { Target, TARGETS } from '../utils/Target';
import {
    CARD_TYPES,
    Header,
    Interpreter,
    ParsedCode,
} from '../../interpreter/Interpreter';

@ObjectType()
export class Resource {
    @Field()
    name: string;
    @Field()
    amount: number;
}
@ObjectType()
export class CardObjMetadata implements Header {
    @Field(() => [TARGETS], { nullable: true })
    VALID_TARGETS?: TARGETS[];

    @Field(() => CARD_TYPES, { nullable: true })
    TYPE?: CARD_TYPES;

    @Field(() => Number, { nullable: true })
    HEALTH?: number;

    @Field(() => Number, { nullable: true })
    ATTACK?: number;

    @Field(() => [Resource], { nullable: true })
    RESOURCES?: Resource[];
}
interface Minion extends Target {
    attack?: number;
    attacked?: boolean;
    executeAttack?: (target: Target[]) => void;
    increaseAttack?: (amount: number) => void;
    decreaseAttack?: (amount: number) => void;
}
@ObjectType()
export class CardObj implements CardInfo, Minion {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    uuid: string = nanoid();

    @Field(() => Number, { nullable: true })
    health?: number;

    @Field(() => Number, { nullable: true })
    attack?: number;

    @Field(() => Boolean, { nullable: true })
    attacked?: boolean;

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

    @Field(() => CardObjMetadata, { nullable: true })
    metadata: CardObjMetadata;

    damage(dmgAmount: number) {
        if (this.health) {
            this.health -= dmgAmount;
        }
    }

    heal(healAmount: number) {
        if (this.health && this.metadata.HEALTH) {
            this.health += healAmount;
            this.health = Math.min(this.health, this.metadata.HEALTH);
        }
    }

    executeAttack(target: Target[]) {
        if (this.attacked) throw new Error('You already attacked!');
        target.forEach((t) => {
            if (this.attack) {
                t.damage(this.attack);
            }
        });
        this.attacked = true;
    }

    increaseAttack(amount: number) {
        if (this.attack && this.metadata.ATTACK) {
            this.attack += amount;
        }
    }

    decreaseAttack(amount: number) {
        if (this.attack && this.metadata.ATTACK) {
            this.attack -= amount;
            this.attack = Math.max(this.attack, 0);
        }
    }
    constructor(card: CardInfo, isFoil: boolean) {
        Object.assign(this, card);
        this.metadata = card.metadata;
        this.attacked = true;
        this.health = this.metadata.HEALTH;
        this.attack = this.metadata.ATTACK;

        this.isFoil = isFoil;
    }
}

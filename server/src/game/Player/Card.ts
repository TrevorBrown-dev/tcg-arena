import { Field, ObjectType } from 'type-graphql';
import { nanoid } from 'nanoid';
import { CardInfo } from '../../utils/types/CardTypes';
import { Target, TARGETS, TARGET_TYPE } from '../utils/Target';
import {
    CARD_TYPES,
    Header,
    Interpreter,
    ParsedCode,
} from '../../interpreter/Interpreter';
import { Game } from '../Game';
import { Resources } from './Player';

@ObjectType()
class ResourceCosts {
    @Field({ nullable: true })
    swords?: number;

    @Field({ nullable: true })
    cups?: number;

    @Field({ nullable: true })
    wands?: number;

    @Field({ nullable: true })
    pentacles?: number;
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

    @Field(() => ResourceCosts, { nullable: true })
    RESOURCES?: ResourceCosts;

    @Field(() => Number, { nullable: true })
    NUM_TARGETS?: number;
}
interface Minion extends Target {
    attack?: number;
    attacked?: boolean;
    executeAttack?: (target: Target[], game: Game, playerId: string) => void;
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

    type = TARGET_TYPE.MINION;

    @Field(() => CardObjMetadata, { nullable: true })
    metadata: CardObjMetadata;

    damage(dmgAmount: number, game: Game) {
        if (this.health) {
            this.health -= dmgAmount;
            const player = game.players.find((p) =>
                p.playField.findCard(this.uuid)
            );
            if (!player) throw new Error('Player not found in damage action');
            if (this.health <= 0) {
                game.executeRawCode(`DESTROY;`, player.uuid, this.uuid);
            }
        }
    }

    heal(healAmount: number, game: Game) {
        if (this.health && this.metadata.HEALTH) {
            this.health += healAmount;
            this.health = Math.min(this.health, this.metadata.HEALTH);
        }
    }

    executeAttack(target: Target[], game: Game, playerId: string) {
        if (this.attacked) throw new Error('You already attacked!');
        target.forEach(async (t) => {
            if (this.attack) {
                await game.executeRawCode(
                    `ATTACK ${t.uuid} ${this.attack}`,
                    playerId,
                    this.uuid
                );
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

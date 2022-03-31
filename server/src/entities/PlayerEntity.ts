import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from './Account';
import { DeckTemplate } from './DeckTemplate';
import { GameEntity } from './GameEntity';

@Entity()
@ObjectType()
export class PlayerEntity extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Account)
    @JoinColumn()
    account!: Account;

    @Field(() => Account, { nullable: true })
    @OneToOne(() => GameEntity, (game) => game.player1)
    @OneToOne(() => GameEntity, (game) => game.player2)
    game!: GameEntity;

    @Field(() => DeckTemplate)
    @OneToOne(() => DeckTemplate)
    deckTemplate!: DeckTemplate;
}

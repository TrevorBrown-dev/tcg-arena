import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';
import { Deck } from './Deck';
import { Player } from './Player';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Account, { nullable: true })
    @OneToOne(() => Player, (player) => player.game)
    player1!: Player;

    @Field(() => Account, { nullable: true })
    @OneToOne(() => Player, (player) => player.game)
    player2!: Player;
}

import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, PrimaryGeneratedColumn, Entity, Column } from 'typeorm';
import { Account } from './Account';

@ObjectType()
@Entity()
export class Lobby extends BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn()
    id: String = nanoid();

    @Field(() => Account, { nullable: true })
    @Column({ nullable: true })
    player1!: Account;

    @Field(() => Account, { nullable: true })
    @Column({ nullable: true })
    player2!: Account;
}

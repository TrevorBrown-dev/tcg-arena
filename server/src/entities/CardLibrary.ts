import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    Column,
    OneToOne,
    ManyToMany,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';

@ObjectType()
@Entity()
export class CardLibrary extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Account, (account) => account.cardLibrary)
    account!: Account;

    @Field(() => [Card])
    @Column(() => Card, { array: true })
    cards!: Card[];
}

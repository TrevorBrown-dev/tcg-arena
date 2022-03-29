import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { Account } from './Account';

@ObjectType()
@Entity()
export class Lobby extends BaseEntity {
    @Field(() => String)
    @PrimaryColumn()
    id: String = nanoid();

    @Field(() => [Account], { nullable: true })
    @OneToMany(() => Account, (account) => account.lobby, {
        onDelete: 'CASCADE',
    })
    members!: Account[];
}

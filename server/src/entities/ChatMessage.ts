import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    Column,
} from 'typeorm';
import { Account } from './Account';
import { Lobby } from './Lobby';

@ObjectType()
@Entity()
export class ChatMessage extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Account)
    @ManyToOne(() => Account, {
        onDelete: 'CASCADE',
    })
    account!: Account;

    @ManyToOne(() => Lobby, (lobby) => lobby.chatMessages, {
        onDelete: 'CASCADE',
    })
    lobby!: Lobby;

    @Field(() => String)
    @Column()
    message!: string;
}

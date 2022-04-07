import argon2 from 'argon2';
import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import {
    AfterInsert,
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CardLibrary } from './CardLibrary';
import { Lobby } from './Lobby';
@Entity()
@ObjectType()
export class Account extends BaseEntity {
    static async createDefaultCardLibrary(account: Account) {
        const cardLibrary = CardLibrary.create({
            account,
            cards: [],
        });
        console.log(cardLibrary);
        await cardLibrary.save();
        account.cardLibrary = cardLibrary;
        await account.save();
    }

    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ unique: true })
    friendCode: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field()
    @Column()
    userName: string;

    @Field(() => CardLibrary, { nullable: true })
    @OneToOne(() => CardLibrary, (library) => library.account)
    @JoinColumn()
    cardLibrary: CardLibrary;

    @ManyToOne(() => Lobby, (lobby) => lobby.members, {
        nullable: true,
    })
    lobby?: Lobby | null;
}

import argon2 from 'argon2';
import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CardLibrary } from './CardLibrary';
import { Game } from './Game';

@Entity()
@ObjectType()
export class Account extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field()
    @Column()
    userName: string;

    @OneToMany(() => Game, (game) => game.player1)
    @OneToMany(() => Game, (game) => game.player2)
    games: Game[];

    @OneToOne(() => CardLibrary, (library) => library)
    cardLibrary: CardLibrary;
}

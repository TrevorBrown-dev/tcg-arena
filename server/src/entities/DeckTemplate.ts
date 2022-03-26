import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    OneToMany,
} from 'typeorm';
import { Card } from './Card';
import { CardLibrary } from './CardLibrary';
import { Deck } from './Deck';

@ObjectType()
@Entity()
export class DeckTemplate extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Column(() => Card, { array: true })
    cards!: Card[];

    @OneToMany(() => Deck, (deck) => deck.template)
    decks!: Deck[];
}

import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    OneToOne,
} from 'typeorm';
import { shuffleArray } from '../utils/shuffleArray';
import { Card } from './Card';
import { CardLibrary } from './CardLibrary';
import { Deck } from './Deck';
import { Player } from './Player';

@ObjectType()
@Entity()
export class DeckTemplate extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => Card)
    @ManyToMany(() => Card)
    cards!: Card[];

    @OneToOne(() => Player, (player) => player.deckTemplate)
    player!: Player;

    public loadCardsFromTemplate() {
        const cards = [...this.cards];
        return cards;
    }
}

import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CardLibrary } from './CardLibrary';
import { CardRecord } from './CardRecord';

@ObjectType()
@Entity()
export class DeckTemplate extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => [CardRecord])
    @ManyToMany(() => CardRecord, {
        onDelete: 'CASCADE',
        eager: true,
        cascade: true,
    })
    @JoinTable({ name: 'card_in_deck_template' })
    cards!: CardRecord[];

    @ManyToOne(() => CardLibrary, (cardLibrary) => cardLibrary.deckTemplates)
    cardLibrary!: CardLibrary;

    public loadCardsFromTemplate() {
        const cards = CardRecord.mapRecordsToCards(this.cards);
        return cards;
    }
}

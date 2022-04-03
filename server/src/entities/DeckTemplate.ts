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
import { Card } from './Card';
import { CardLibrary } from './CardLibrary';
import { CardRecord, WithCardRecords } from './CardRecord';

@ObjectType()
@Entity()
export class DeckTemplate extends BaseEntity implements WithCardRecords {
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
    })
    @JoinTable({ name: 'card_in_deck_template' })
    cards!: CardRecord[];

    @ManyToOne(() => CardLibrary, (cardLibrary) => cardLibrary.deckTemplates)
    cardLibrary!: CardLibrary;

    public static loadCardsFromTemplate(template: DeckTemplate) {
        console.log('loading cards from template');
        const cards = CardRecord.mapRecordsToCards(template.cards);
        return cards;
    }
}

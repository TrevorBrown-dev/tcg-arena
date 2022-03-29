import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    Column,
    OneToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { Account } from './Account';
import { Card } from './Card';
import { CardRecord, WithCardRecords } from './CardRecord';
import { DeckTemplate } from './DeckTemplate';

@ObjectType()
@Entity()
export class CardLibrary extends BaseEntity implements WithCardRecords {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => Account, (account) => account.cardLibrary)
    account!: Account;

    @Field(() => [CardRecord])
    @ManyToMany(() => CardRecord, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinTable({ name: 'card_ownership' })
    cards!: CardRecord[];

    @Field(() => [DeckTemplate])
    @OneToMany(() => DeckTemplate, (deckTemplate) => deckTemplate.cardLibrary, {
        onDelete: 'CASCADE',
    })
    deckTemplates!: DeckTemplate[];
}

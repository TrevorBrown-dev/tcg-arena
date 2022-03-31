import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToMany,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Card } from './Card';

@ObjectType()
@Entity()
export class CardRecord extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Card)
    @ManyToOne(() => Card, { eager: true })
    card: Card;

    @Field(() => Number)
    @Column()
    amount: number;

    static async createRecord(
        card: Card,
        amount: number = 1
    ): Promise<CardRecord> {
        const cardRecord = CardRecord.create({ card, amount });
        cardRecord.card = card;
        cardRecord.amount = amount;
        await cardRecord.save();
        return cardRecord;
    }

    static async addCount(
        owner: WithCardRecords & BaseEntity,
        card: Card,
        amount: number = 1
    ) {
        const existingRecord = owner.cards.find(
            (cardRecord) => cardRecord.card.id === card.id
        );
        if (existingRecord) {
            existingRecord.amount += amount;
            await existingRecord.save();
        } else {
            const record = await CardRecord.create({
                card,
                amount,
            }).save();
            owner.cards.push(record);
        }
        await owner.save();
    }

    static async removeCount(
        owner: WithCardRecords & BaseEntity,
        card: Card,
        amount: number = 1
    ): Promise<boolean> {
        const record = owner.cards.find(
            (cardRecord) => cardRecord.card.id === card.id
        );
        if (!record) return false;
        if (record.amount <= amount) {
            owner.cards = owner.cards.filter(
                (cardRecord) => cardRecord.card.id !== card.id
            );
            await record.remove();
        } else {
            record.amount -= amount;
            await record.save();
        }
        await owner.save();
        return true;
    }

    static mapRecordsToCards(records: CardRecord[]): Card[] {
        const allCards: Card[] = [];
        records.forEach((record) => {
            for (let i = 0; i < record.amount; i++) {
                allCards.push(record.card);
            }
        });
        return allCards;
    }
}

export interface WithCardRecords {
    cards: CardRecord[];
}

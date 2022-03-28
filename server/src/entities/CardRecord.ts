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

    @ManyToOne(() => Card)
    card: Card;

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

    async removeCount(amount: number = 1): Promise<CardRecord> {
        this.amount -= amount;
        if (this.amount < 0) {
            return await this.remove();
        }

        await this.save();
        return this;
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

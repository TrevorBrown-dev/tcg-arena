import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { pubsub } from '..';
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

    @Field(() => [DeckTemplate], { nullable: true })
    @OneToMany(() => DeckTemplate, (deckTemplate) => deckTemplate.cardLibrary, {
        onDelete: 'CASCADE',
        nullable: true,
    })
    deckTemplates!: DeckTemplate[];

    static async findCardInDeckTemplates(
        library: CardLibrary,
        card: Card,
        isFoil: boolean
    ) {
        if (!library.deckTemplates) return null;
        return library.deckTemplates.find((deckTemplate) =>
            deckTemplate.cards.find(
                (cardRecord) =>
                    cardRecord.card.id === card.id &&
                    cardRecord.isFoil === isFoil
            )
        );
    }

    static async removeCardFromDeckTemplates(
        library: CardLibrary,
        card: Card,
        isFoil: boolean
    ) {
        console.log(this);
        const isInDeckTemplate = !!CardLibrary.findCardInDeckTemplates(
            library,
            card,
            isFoil
        );
        if (!isInDeckTemplate) return false;
        library.deckTemplates = await Promise.all(
            library.deckTemplates.map(async (deckTemplate) => {
                deckTemplate.cards = await Promise.all(
                    deckTemplate.cards.map(async (cardRecord) => {
                        if (
                            cardRecord.card.id == card.id &&
                            cardRecord.isFoil == isFoil
                        ) {
                            const recordInLibrary = library.cards.find(
                                (record) =>
                                    record.card.id == card.id &&
                                    record.isFoil == isFoil
                            );
                            console.log(
                                'RECORD FOUND',
                                library,
                                recordInLibrary
                            );
                            if (
                                !recordInLibrary ||
                                cardRecord.amount > recordInLibrary.amount
                            ) {
                                await CardRecord.removeCount(
                                    deckTemplate,
                                    cardRecord.card,
                                    cardRecord.isFoil
                                );
                                await deckTemplate.save();
                                console.log(deckTemplate);
                                pubsub.publish(
                                    `deckTemplateUpdated_${deckTemplate.id}`,
                                    {
                                        deckTemplate,
                                    }
                                );
                            }
                        }
                        return cardRecord;
                    })
                );
                await deckTemplate.save();
                return deckTemplate;
            })
        );
        await library.save();
        return true;
    }
}

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

    static async removeCardFromLibrary(
        id: number,
        cardId: number,
        isFoil: boolean
    ) {
        //Finds library based on id
        const library = await CardLibrary.findOne({
            where: { id },
            relations: [
                'account',
                'cards',
                'deckTemplates',
                'deckTemplates.cards',
            ],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        //Finds card based on cardId
        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        //Either deletes or decrements the CardRecord of a specific card to the library
        //This CardRecord indicates how much of a specific card is in a CardLibrary

        //! Make sure you remove the card from the library before you remove the card from the deck templates
        const success = await CardRecord.removeCount(library, card, isFoil);
        if (!success) throw new Error(`Card not found in library`);
        await CardLibrary.removeCardFromDeckTemplates(library, card, isFoil);
        pubsub.publish(`updateCardLibrary_${library.account.id}`, {
            records: library.cards,
        });
        return true;
    }

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

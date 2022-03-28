import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { CardRecord } from '../entities/CardRecord';

@Resolver()
class CardLibraryResolver {
    @Query(() => [Card])
    async cardsInLibrary(@Arg('id') id: number): Promise<Card[]> {
        const library = await CardLibrary.findOne(id);
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);
        const cards = CardRecord.mapRecordsToCards(library.cards);
        return cards || [];
    }

    @Query(() => [CardLibrary])
    async cardLibraries(): Promise<CardLibrary[]> {
        return await CardLibrary.find({
            relations: ['cards', 'cards.card'],
        });
    }

    @Mutation(() => [Card])
    async addCardToLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<Card[]> {
        const library = await CardLibrary.findOne({
            where: { id },
            relations: ['account'],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        const existingRecord = library.cards.find(
            (cardRecord) => cardRecord.card.id === cardId
        );
        if (existingRecord) {
            existingRecord.amount++;
            existingRecord.save();
        } else {
            const record = await CardRecord.create({
                card,
                amount: 1,
            }).save();
            library.cards.push(record);
        }
        await library.save();

        return CardRecord.mapRecordsToCards(library.cards);
    }

    @Mutation(() => Boolean)
    async removeCardFromLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<boolean> {
        const library = await CardLibrary.findOne({
            where: { id },
            relations: ['account'],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        const record = library.cards.find(
            (cardRecord) => cardRecord.card.id === cardId
        );
        if (!record) return false;
        if (record.amount <= 1) {
            await record.remove();
        } else {
            record.amount--;
            await record.save();
        }
        await library.save();

        return true;
    }
}

export default CardLibraryResolver;

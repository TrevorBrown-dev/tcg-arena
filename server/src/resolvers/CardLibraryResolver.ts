import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { CardRecord } from '../entities/CardRecord';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class CardLibraryResolver {
    @Query(() => [CardRecord])
    async cardsInLibrary(@Arg('id') id: number): Promise<CardRecord[]> {
        const library = await CardLibrary.findOne(id);
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);
        return library.cards || [];
    }

    @Query(() => [CardRecord])
    async myCardLibrary(
        @Ctx() { req: { req } }: MyContext
    ): Promise<CardRecord[]> {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('Not authenticated');
        const account = await parseJWT(authorization);
        if (!account) throw new Error('No account found');
        const library = await CardLibrary.findOne({
            where: { account },
            relations: ['account', 'cards'],
        });

        if (!library)
            throw new Error(`CardLibrary not found with id: ${account.id}`);
        console.log(library);
        return library.cards;
    }

    @Query(() => [CardLibrary])
    async cardLibraries(): Promise<CardLibrary[]> {
        return await CardLibrary.find({
            relations: ['cards', 'cards.card', 'deckTemplates', 'account'],
        });
    }
    @Mutation(() => [CardRecord])
    async addCardToLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<CardRecord[]> {
        const library = await CardLibrary.findOne({
            where: { id },
            relations: ['account', 'cards'],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);
        console.log('CARDS IN LIB', library, card);

        await CardRecord.addCount(library, card);
        return library.cards;
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

        return await CardRecord.removeCount(library, card);
    }
}

export default CardLibraryResolver;

import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { CardRecord } from '../entities/CardRecord';
import { MyContext } from '../types';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class CardLibraryResolver {
    //Finds a library based on id and returns all of the cards in that array
    @Query(() => [CardRecord])
    async cardsInLibrary(@Arg('id') id: number): Promise<CardRecord[]> {
        const library = await CardLibrary.findOne(id);
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);
        return library.cards || [];
    }

    //Reads authorization cookie and returns the logged in user's cardLibrary
    @Query(() => [CardRecord])
    async myCardLibrary(
        @Ctx() { req: { req } }: MyContext
    ): Promise<CardRecord[]> {
        //Checks authorization cookie
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error('Not authenticated');

        //Finds account based on id located in JWT
        const account = await parseJWT(authorization);
        if (!account) throw new Error('No account found');

        //Finds the card library based on the account and returns in
        const library = await CardLibrary.findOne({
            where: { account },
            relations: ['account', 'cards'],
        });

        if (!library)
            throw new Error(`CardLibrary not found with id: ${account.id}`);
        return library.cards;
    }

    //Pulls all cardLibraries
    @Query(() => [CardLibrary])
    async cardLibraries(): Promise<CardLibrary[]> {
        return await CardLibrary.find({
            relations: ['cards', 'cards.card', 'deckTemplates', 'account'],
        });
    }

    //Creates a card and adds it to a specific library
    @Mutation(() => [CardRecord])
    async addCardToLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<CardRecord[]> {
        //Finds library based on id
        const library = await CardLibrary.findOne({
            where: { id },
            relations: ['account', 'cards'],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        //Finds card based on cardId
        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        //Either creates or increments the CardRecord of a specific card to the library
        //This CardRecord indicates how much of a specific card is in a CardLibrary
        await CardRecord.addCount(library, card);

        return library.cards;
    }

    //Removes a card from a specific library
    @Mutation(() => Boolean)
    async removeCardFromLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<boolean> {
        //Finds library based on id
        const library = await CardLibrary.findOne({
            where: { id },
            relations: ['account'],
        });
        if (!library) throw new Error(`CardLibrary not found with id: ${id}`);

        //Finds card based on cardId
        const card = await Card.findOne(cardId);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        //Either deletes or decrements the CardRecord of a specific card to the library
        //This CardRecord indicates how much of a specific card is in a CardLibrary
        return await CardRecord.removeCount(library, card);
    }
}

export default CardLibraryResolver;

import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
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
    //Might need to be a subscription
    @Subscription(() => [CardRecord], {
        topics: ({ args, context }) => {
            const cookie = context.extra.request?.headers?.cookie;
            const account = parseJWT(cookie);
            if (!account || !account?.id) {
                console.log(
                    `No account found with cookie ${cookie} and payload response:`,
                    account
                );
            }

            setTimeout(async () => {
                const library = await CardLibrary.findOne({
                    where: {
                        account,
                    },
                    relations: ['account', 'cards'],
                });
                if (!library)
                    throw new Error(
                        `CardLibrary not found with account id: ${account.id}`
                    );
                pubsub.publish(`updateCardLibrary_${account.id}`, {
                    records: library.cards || [],
                });
            }, 1);

            return `updateCardLibrary_${account.id}`;
        },
    })
    async myCardLibrary(
        @Root('records') records: CardRecord[]
    ): Promise<CardRecord[]> {
        return records;
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
        @Arg('cardId') cardId: number,
        @Arg('isFoil', { defaultValue: false }) isFoil: boolean = false
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
        await CardRecord.addCount(library, card, isFoil);
        pubsub.publish(`updateCardLibrary_${library.account.id}`, {
            records: library.cards,
        });
        return library.cards;
    }

    //Removes a card from a specific library
    @Mutation(() => Boolean)
    async removeCardFromLibrary(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number,
        @Arg('isFoil', { defaultValue: false }) isFoil: boolean = false
    ): Promise<boolean> {
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
        await CardLibrary.removeCardFromDeckTemplates(library, card, isFoil);
        pubsub.publish(`updateCardLibrary_${library.account.id}`, {
            records: library.cards,
        });
        return success;
    }
}

export default CardLibraryResolver;

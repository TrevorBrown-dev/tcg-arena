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
import { DeckTemplate } from '../entities/DeckTemplate';
import { MyContext, SubscriptionIterator } from '../types';
import { parseJWT } from '../utils/parseJWT';
import { DeckTemplateInput } from './inputs/DeckTemplateInput';
@Resolver()
class DeckTemplateResolver {
    //Returns all dexkTemplates
    @Query(() => [DeckTemplate])
    async deckTemplates(): Promise<DeckTemplate[]> {
        return await DeckTemplate.find({
            relations: ['cardLibrary', 'cards'],
        });
    }

    @Subscription(() => [DeckTemplate], {
        topics: ({ args, context }) => {
            const cookie = context.extra.request?.headers?.cookie;
            const account = parseJWT(cookie);
            if (!account || !account?.id) {
                console.log(
                    `No account found with cookie ${cookie} and payload response:`,
                    account
                );
                return 'ERROR';
            }

            setTimeout(async () => {
                const cardLibrary = await CardLibrary.findOne({
                    where: { account },
                    relations: [
                        'account',
                        'deckTemplates',
                        'deckTemplates.cards',
                    ],
                });
                if (!cardLibrary) {
                    console.log('No card library found');
                    return;
                }
                pubsub.publish(`deckTemplateCreated_${account.id}`, {
                    deckTemplates: cardLibrary.deckTemplates,
                });
            }, 1);
            return `deckTemplateCreated_${account.id}`;
        },
    })
    async myDeckTemplates(
        @Root('deckTemplates') deckTemplates: DeckTemplate[]
    ) {
        return deckTemplates || [];
    }

    //Creates and returns a deckTemplate
    @Mutation(() => DeckTemplate)
    async createDeckTemplate(
        @Arg('data') data: DeckTemplateInput,
        @Ctx() { req: { req } }: MyContext
    ): Promise<DeckTemplate | null> {
        //Pulls cookie and checks for authorization and finds account
        const authorization = req.headers.cookie;
        if (!authorization && !data.cardLibraryId) return null;
        const account = parseJWT(authorization!);

        //Finds cardLibrary based on account
        const cardLibrary = await CardLibrary.findOne({
            where: { account },
            relations: ['account', 'deckTemplates', 'deckTemplates.cards'],
        });
        if (!cardLibrary)
            throw new Error(
                `CardLibrary not found with id: ${data.cardLibraryId}`
            );

        //Creates a deckTemplate and stores in on the person's deckTemplate
        const deckTemplate = await DeckTemplate.create({
            name: data.name,
            cards: [],
        }).save();
        if (!deckTemplate)
            throw new Error('DeckTemplate not created something went wrong :(');
        cardLibrary.deckTemplates.unshift(deckTemplate);
        await cardLibrary.save();

        //Publishes this data to subscription
        pubsub.publish(`deckTemplateCreated_${account.id}`, {
            deckTemplates: cardLibrary.deckTemplates,
        });

        return deckTemplate;
    }

    //Deletes a deckTemplate from an account
    @Mutation(() => Boolean)
    async deleteDeckTemplate(
        @Arg('id') id: number,
        @Ctx() { req: { req } }: MyContext
    ) {
        //Pulls cookie and checks for authorization and finds account
        const authorization = req.headers.cookie;
        if (!authorization) return false;
        const account = parseJWT(authorization!);
        if (!account) return false;

        //Finds cardLibrary based on account
        const cardLibrary = await CardLibrary.findOne({
            where: {
                account,
            },
            relations: ['account', 'deckTemplates', 'deckTemplates.cards'],
        });
        if (!cardLibrary) return false;

        //Sets deckTemplates to deckTemplates besides the one passed to this function
        cardLibrary.deckTemplates = cardLibrary.deckTemplates.filter(
            (deckTemplate) => deckTemplate.id !== id
        );
        await cardLibrary.save();

        //Publishes this data to subscription
        pubsub.publish(`deckTemplateCreated_${account.id}`, {
            deckTemplates: cardLibrary.deckTemplates,
        });
        return true;
    }

    //Adds a card to a deckTemplate
    @Mutation(() => DeckTemplate)
    async addCardToDeckTemplate(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number,
        @Arg('isFoil', { defaultValue: false }) isFoil: boolean = false
    ): Promise<DeckTemplate> {
        const deckTemplate = await DeckTemplate.findOne({
            where: { id },
            relations: ['cardLibrary', 'cards', 'cardLibrary.cards'],
        });
        const card = await Card.findOne(cardId);

        if (!deckTemplate)
            throw new Error(`DeckTemplate not found with id: ${id}`);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);
        const recordInLibrary = deckTemplate.cardLibrary.cards.find(
            (cardRecord) =>
                cardRecord.card.id === card.id && cardRecord.isFoil === isFoil
        );

        //TODO: SOME CUSTOM ERROR RESPONSES LIKE ACCOUNT
        if (!recordInLibrary)
            throw new Error(
                `Card not found in CardLibrary with id: ${deckTemplate.cardLibrary.id}`
            );

        const recordInDeck = deckTemplate.cards.find(
            (cardRecord) =>
                cardRecord.card.id === card.id && cardRecord.isFoil === isFoil
        );
        if (recordInDeck) {
            if (recordInDeck.amount >= recordInLibrary.amount) {
                recordInDeck.amount = recordInLibrary.amount;
                await recordInDeck.save();
                throw new Error(
                    `Reached limit of ${recordInLibrary.amount} of card ID ${card.id} in Deck Template ${deckTemplate.id}`
                );
            } else {
                await CardRecord.addCount(deckTemplate, card, isFoil);
            }
        } else if (recordInLibrary.amount > 0) {
            const record = await CardRecord.create({
                card,
                amount: 1,
                isFoil,
            }).save();
            deckTemplate.cards.push(record);
        } else {
            throw new Error(
                `Reached limit of ${recordInLibrary.amount} of card ID ${card.id} in Deck Template ${deckTemplate.id}`
            );
        }

        await deckTemplate.save();

        pubsub.publish(`deckTemplateUpdated_${id}`, { deckTemplate });
        return deckTemplate;
    }

    @Mutation(() => DeckTemplate)
    async removeCardFromDeckTemplate(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number,
        @Arg('isFoil', { defaultValue: false }) isFoil: boolean = false
    ): Promise<DeckTemplate> {
        const deckTemplate = await DeckTemplate.findOne({
            where: { id },
            relations: ['cardLibrary', 'cards', 'cardLibrary.cards'],
        });
        const card = await Card.findOne(cardId);

        if (!deckTemplate)
            throw new Error(`DeckTemplate not found with id: ${id}`);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);
        const recordInDeck = deckTemplate.cards.find(
            (cardRecord) =>
                cardRecord.card.id === card.id && cardRecord.isFoil === isFoil
        );
        if (!recordInDeck)
            throw new Error(
                `Card not found in Deck Template ${deckTemplate.id}`
            );
        await CardRecord.removeCount(deckTemplate, card, isFoil);
        await deckTemplate.save();

        pubsub.publish(`deckTemplateUpdated_${id}`, { deckTemplate });
        return deckTemplate;
    }

    @Subscription(() => DeckTemplate, {
        topics: ({ args }) => {
            //? Do this to publish the current state of the deck template at the time of subscription
            setTimeout(async () => {
                const deckTemplate = await DeckTemplate.findOne({
                    where: { id: args.id },
                    relations: ['cardLibrary', 'cards', 'cardLibrary.cards'],
                });
                if (!deckTemplate)
                    throw new Error(
                        `DeckTemplate not found with id: ${args.id}`
                    );
                pubsub.publish(`deckTemplateUpdated_${args.id}`, {
                    deckTemplate,
                });
            }, 1);

            return `deckTemplateUpdated_${args.id}`;
        },
    })
    deckTemplateUpdated(
        @Root('deckTemplate') deckTemplate: SubscriptionIterator<DeckTemplate>,
        @Arg('id') id: number
    ): SubscriptionIterator<DeckTemplate> {
        return deckTemplate;
    }
}

export default DeckTemplateResolver;

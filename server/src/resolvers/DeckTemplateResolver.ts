import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { pubsub } from '..';
import { Account } from '../entities/Account';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { CardRecord } from '../entities/CardRecord';
import { DeckTemplate } from '../entities/DeckTemplate';
import { MyContext, SubscriptionIterator } from '../types';
import {
    getAccountFromCookie,
    getAccountIdFromCookie,
} from '../utils/auth/getAccountFromCookie';
import { parseJWT } from '../utils/parseJWT';
import { DeckTemplateInput } from './inputs/DeckTemplateInput';
@Resolver()
class DeckTemplateResolver {
    @Query(() => [DeckTemplate])
    async deckTemplates(): Promise<DeckTemplate[]> {
        const deckTemplates = await DeckTemplate.find({
            relations: ['cardLibrary', 'cards'],
        });
        console.log(deckTemplates);

        return deckTemplates;
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

    @Mutation(() => DeckTemplate)
    async createDeckTemplate(
        @Arg('data') data: DeckTemplateInput,
        @Ctx() { req: { req } }: MyContext
    ): Promise<DeckTemplate | null> {
        const authorization = req.headers.cookie;
        if (!authorization && !data.cardLibraryId) return null;
        const account = parseJWT(authorization!);

        const cardLibrary = await CardLibrary.findOne({
            where: { account },
            relations: ['account', 'deckTemplates', 'deckTemplates.cards'],
        });
        if (!cardLibrary)
            throw new Error(
                `CardLibrary not found with id: ${data.cardLibraryId}`
            );
        const deckTemplate = await DeckTemplate.create({
            name: data.name,
            cards: [],
        }).save();
        if (!deckTemplate)
            throw new Error('DeckTemplate not created something went wrong :(');
        cardLibrary.deckTemplates.push(deckTemplate);
        await cardLibrary.save();
        pubsub.publish(`deckTemplateCreated_${account.id}`, {
            deckTemplates: cardLibrary.deckTemplates,
        });

        return deckTemplate;
    }

    @Mutation(() => Boolean)
    async deleteDeckTemplate(
        @Arg('id') id: number,
        @Ctx() { req: { req } }: MyContext
    ) {
        const authorization = req.headers.cookie;
        if (!authorization) return false;
        const account = parseJWT(authorization!);
        if (!account) return false;
        const cardLibrary = await CardLibrary.findOne({
            where: {
                account,
            },
            relations: ['account', 'deckTemplates', 'deckTemplates.cards'],
        });
        if (!cardLibrary) return false;
        cardLibrary.deckTemplates = cardLibrary.deckTemplates.filter(
            (deckTemplate) => deckTemplate.id !== id
        );
        await cardLibrary.save();
        pubsub.publish(`deckTemplateCreated_${account.id}`, {
            deckTemplates: cardLibrary.deckTemplates,
        });
        return true;
    }

    @Mutation(() => DeckTemplate)
    async addCardToDeckTemplate(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
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
            (cardRecord) => cardRecord.card.id === card.id
        );

        //TODO: SOME CUSTOM ERROR RESPONSES LIKE ACCOUNT
        if (!recordInLibrary)
            throw new Error(
                `Card not found in CardLibrary with id: ${deckTemplate.cardLibrary.id}`
            );

        const recordInDeck = deckTemplate.cards.find(
            (cardRecord) => cardRecord.card.id === card.id
        );
        if (recordInDeck) {
            if (recordInDeck.amount >= recordInLibrary.amount) {
                recordInDeck.amount = recordInLibrary.amount;
                await recordInDeck.save();
                throw new Error(
                    `Reached limit of ${recordInLibrary.amount} of card ID ${card.id} in Deck Template ${deckTemplate.id}`
                );
            } else {
                await CardRecord.addCount(deckTemplate, card);
            }
        } else if (recordInLibrary.amount > 0) {
            const record = await CardRecord.create({
                card,
                amount: 1,
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

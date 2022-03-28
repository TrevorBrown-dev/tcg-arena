import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { BaseEntity } from 'typeorm';
import { pubsub } from '..';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { CardRecord } from '../entities/CardRecord';
import { DeckTemplate } from '../entities/DeckTemplate';
import { SubscriptionIterator } from '../types';
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

    @Mutation(() => DeckTemplate)
    async createDeckTemplate(
        @Arg('data') data: DeckTemplateInput
    ): Promise<DeckTemplate> {
        const cardLibrary = await CardLibrary.findOne(data.cardLibraryId);
        if (!cardLibrary)
            throw new Error(
                `CardLibrary not found with id: ${data.cardLibraryId}`
            );
        const deckTemplate = await DeckTemplate.create({
            name: data.name,
            cardLibrary,
            cards: [],
        }).save();
        if (!deckTemplate)
            throw new Error('DeckTemplate not created something went wrong :(');

        return deckTemplate;
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

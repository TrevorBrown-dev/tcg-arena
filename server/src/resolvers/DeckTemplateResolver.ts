import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
import { Card } from '../entities/Card';
import { CardLibrary } from '../entities/CardLibrary';
import { DeckTemplate } from '../entities/DeckTemplate';
import { SubscriptionIterator } from '../types';
import { DeckTemplateInput } from './inputs/DeckTemplateInput';
@Resolver()
class DeckTemplateResolver {
    @Query(() => [DeckTemplate])
    async deckTemplates(): Promise<DeckTemplate[]> {
        const deckTemplates = await DeckTemplate.find();
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

        return deckTemplate;
    }

    @Mutation(() => DeckTemplate)
    async addCardToDeckTemplate(
        @Arg('id') id: number,
        @Arg('cardId') cardId: number
    ): Promise<DeckTemplate> {
        const deckTemplate = await DeckTemplate.findOne({
            where: { id },
            relations: ['cardLibrary', 'cards'],
        });
        const card = await Card.findOne(cardId);

        if (!deckTemplate)
            throw new Error(`DeckTemplate not found with id: ${id}`);
        if (!card) throw new Error(`Card not found with id: ${cardId}`);

        await deckTemplate.save();
        // pubsub.publish(`deckTemplateUpdated_${id}`, { deckTemplate });

        return deckTemplate;
    }

    @Subscription(() => DeckTemplate, {
        topics: ({ args }) => {
            return `deckTemplateUpdated_${args.id}`;
        },
    })
    deckTemplateUpdated(
        @Root('deckTemplate') deckTemplate: SubscriptionIterator<DeckTemplate>,
        @Arg('id') id: number
    ): SubscriptionIterator<DeckTemplate> {
        console.log('RUNNING SUBSCRIPTION');
        console.log('data', deckTemplate);
        return deckTemplate;
    }
}

export default DeckTemplateResolver;

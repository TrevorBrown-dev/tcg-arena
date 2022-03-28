import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Card } from '../entities/Card';
import { CardInput } from './inputs/CardInput';

@Resolver(Card)
class CardResolver {
    @Query(() => Card)
    async card(@Arg('id') id: number): Promise<Card> {
        const card = await Card.findOne(id);
        if (!card) throw new Error(`Card not found with id: ${id}`);
        return card;
    }

    @Query(() => [Card])
    async cards(): Promise<Card[]> {
        return await Card.find();
    }

    @Mutation(() => Card)
    async createCard(@Arg('data') data: CardInput): Promise<Card> {
        return await Card.create(data).save();
    }
}

export default CardResolver;

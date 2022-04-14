import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Card } from '../entities/Card';
import { CardInput, UpdateCardInput } from './inputs/CardInput';

@Resolver(Card)
class CardResolver {
    //Finds a card based on an id
    @Query(() => Card)
    async card(@Arg('id') id: number): Promise<Card> {
        const card = await Card.findOne(id);
        if (!card) throw new Error(`Card not found with id: ${id}`);
        return card;
    }

    //Returns all cards
    @Query(() => [Card])
    async cards(): Promise<Card[]> {
        return await Card.find();
    }

    @Authorized()
    @Query(() => [Card])
    async adminCards() {
        return await Card.find();
    }

    //Creates a new card
    // @Authorized()
    @Mutation(() => Card)
    async createCard(@Arg('data') data: CardInput): Promise<Card> {
        return await Card.create(data).save();
    }

    @Authorized()
    @Mutation(() => Card)
    async updateCard(
        @Arg('id') id: number,
        @Arg('data') data: UpdateCardInput
    ): Promise<Card> {
        const card = await Card.findOne(id);
        if (!card) throw new Error(`Card not found with id: ${id}`);
        Object.assign(card, data);
        return await card.save();
    }
}

export default CardResolver;

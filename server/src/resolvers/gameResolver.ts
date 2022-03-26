import {
    Arg,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
import { Account } from '../entities/Account';
import { Game } from '../entities/Game';
import { SubscriptionIterator } from '../types';
import { GameInput } from './inputs/GameInput';
type GameSubArgs = {
    gameId: number;
};
@Resolver(Game)
class GameResolver {
    @Query(() => Game)
    async game(@Arg('id') id: number): Promise<Game> {
        const game = await Game.findOne(id);
        if (!game) throw new Error(`Game not found with id: ${id}`);
        return game;
    }

    @Mutation(() => Game)
    async updateGame(@Arg('id') id: number, @Arg('data') data: GameInput) {
        const game = await Game.findOne(id);

        if (!game) throw new Error(`Game not found with id: ${id}`);

        Object.assign(game, data);

        await game.save();
        console.log(game);

        pubsub.publish(`updateGame_${game.id}`, { game });
        return game;
    }

    @Subscription(() => Game, {
        topics: ({ args }: { args: GameSubArgs }) => {
            return `updateGame_${args.gameId}`;
        },
    })
    watchGame(
        @Root('game') game: SubscriptionIterator<Game>,
        @Arg('gameId') gameId: number
    ): SubscriptionIterator<Game> {
        console.log(game);
        return game;
    }
}
export default GameResolver;

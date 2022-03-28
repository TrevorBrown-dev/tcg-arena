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
import { DeckTemplate } from '../entities/DeckTemplate';
import { GameEntity } from '../entities/GameEntity';
import { PlayerEntity } from '../entities/PlayerEntity';
import { gameMaster } from '../game/GameMaster';
import { SubscriptionIterator } from '../types';
import { GameInput } from './inputs/GameInput';
type GameSubArgs = {
    gameId: number;
};
@Resolver(GameEntity)
class GameResolver {
    @Query(() => GameEntity)
    async game(@Arg('id') id: number): Promise<GameEntity> {
        const game = await GameEntity.findOne(id);
        if (!game) throw new Error(`Game not found with id: ${id}`);
        return game;
    }

    @Mutation(() => GameEntity)
    async createGame(@Arg('data') data: GameInput): Promise<GameEntity> {
        const player1Acc = await Account.findOne(data.player1Id);
        const player2Acc = await Account.findOne(data.player2Id);
        const deckTemplate1 = await DeckTemplate.findOne(data.p1DeckTemplateId);
        const deckTemplate2 = await DeckTemplate.findOne(data.p2DeckTemplateId);
        const player1 = PlayerEntity.create({
            account: player1Acc,
            deckTemplate: deckTemplate1,
        });
        const player2 = PlayerEntity.create({
            account: player2Acc,
            deckTemplate: deckTemplate2,
        });

        //? Player 2 should be nullable?
        const game = gameMaster.createGame(player1, player2);
        return game;
    }

    //! These two down here are old and shouldn't be used I think
    @Mutation(() => GameEntity)
    async updateGame(@Arg('id') id: number, @Arg('data') data: GameInput) {
        const game = await GameEntity.findOne(id);
        if (!game) throw new Error(`Game not found with id: ${id}`);

        return game;
    }

    @Subscription(() => GameEntity, {
        topics: ({ args }: { args: GameSubArgs }) => {
            return `updateGame_${args.gameId}`;
        },
    })
    watchGame(
        @Root('game') game: SubscriptionIterator<GameEntity>,
        @Arg('gameId') gameId: number
    ): SubscriptionIterator<GameEntity> {
        console.log(game);
        return game;
    }
}
export default GameResolver;

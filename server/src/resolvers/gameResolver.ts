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
import { GameEntity } from '../entities/GameEntity';
import { Game } from '../game/Game';
import { Hand } from '../game/Hand';
import { MyContext, SubscriptionIterator } from '../types';
import { getAccountIdFromCookie } from '../utils/auth/getAccountFromCookie';
import { parseJWT } from '../utils/parseJWT';

@Resolver()
class GameResolver {
    @Query(() => Game)
    async game(@Arg('id') id: string) {
        const game = Game.get(id);
        if (!game) throw new Error(`Game not found with id: ${id}`);
        return game;
    }

    @Mutation(() => Boolean)
    async playCard(
        @Arg('gameId') gameId: string,
        @Arg('uuid') uuid: string,
        @Ctx() { req: { req } }: MyContext
    ) {
        //Validation Step
        const authorization = req.headers.cookie;
        const accountId = getAccountIdFromCookie(authorization);
        if (!accountId) throw new Error('No authorization cookie found');

        const game = Game.get(gameId);
        if (!game) throw new Error(`Game not found with id: ${gameId}`);
        const player = game.getPlayerByAccountId(accountId);
        if (!player)
            throw new Error(`You are not a player in game with id: ${gameId}`);
        const card = player.hand.findCard(uuid);
        if (!card)
            throw new Error(
                `Card not found with uuid: ${uuid} in player's hand`
            );

        //Remove the card from the hand
        player.playCard(card);
        //Run interpreter
        // game.executeAction(player.id, card.code);
        //Publish changes
        console.log('PUBLISHING');
        await pubsub.publish(`watchPublicGame_${game.id}`, {
            publicGame: { ...game },
        });
        console.log('publishing private game');

        await pubsub.publish(`watchPrivateGame_${game.id}`, {
            privateGame: { ...game },
        });

        // await Game.publishGame(game);
        return true;
    }

    @Query(() => Game)
    initialPublicGame(@Arg('gameId') gameId: string) {
        const game = Game.get(gameId);
        if (!game) throw new Error(`Game not found with id: ${gameId}`);
        return game;
    }

    @Query(() => Game)
    initialPrivateGame(
        @Arg('gameId') gameId: string,
        @Arg('accountId') accountId: number
    ) {
        const privateGame = Game.get(gameId);
        if (!privateGame) throw new Error(`Game not found with id: ${gameId}`);
        const myPlayer = privateGame.getPlayerByAccountId(accountId);
        return {
            ...privateGame,
            players: [myPlayer],
        };
    }

    @Query(() => Game)
    myInitialPrivateGame(
        @Arg('gameId') gameId: string,
        @Ctx() { req: { req } }: MyContext
    ) {
        const privateGame = Game.get(gameId);
        if (!privateGame) throw new Error(`Game not found with id: ${gameId}`);
        const accountId = getAccountIdFromCookie(req.headers.cookie);
        if (!accountId) throw new Error('No authorization cookie found');
        if (!privateGame.players.find((p) => p.account.id === accountId)) {
            throw new Error(`You are not a player in game with id: ${gameId}`);
        }
        return {
            ...privateGame,
            players: privateGame.players.filter(
                (p) => p.account.id === accountId
            ),
        };
    }

    @Subscription(() => Game, {
        topics: ({ args }) => {
            return `watchPrivateGame_${args.gameId}`;
        },
    })
    async watchMyPrivateGame(
        @Arg('gameId') gameId: string,
        @Root('privateGame') privateGame: Game,
        @Ctx() { accountId }: any
    ) {
        console.log('OTHER STUFF', accountId);
        if (!accountId) throw new Error('No authorization cookie found');
        if (!privateGame) throw new Error(`Game not found with id: ${gameId}`);
        if (!privateGame.players.find((p) => p.account.id === accountId)) {
            console.log('Whoops');
            throw new Error(`You are not a player in game with id: ${gameId}`);
        }
        return {
            ...privateGame,
            players: privateGame.players.filter((p) => {
                console.log('hmmm', p.account.id);
                return p.account.id === accountId;
            }),
        };
    }

    @Subscription(() => Game, {
        topics: ({ args }) => `watchPrivateGame_${args.gameId}`,
    })
    watchPrivateGame(
        @Arg('gameId') gameId: string,
        @Arg('accountId') accountId: number,
        @Root('privateGame') privateGame: Game
    ) {
        return {
            ...privateGame,
            players: privateGame.players.filter(
                (p) => p.account.id === accountId
            ),
        };
    }

    @Subscription(() => Game, {
        topics: ({ args }) => {
            return `watchPublicGame_${args.gameId}`;
        },
    })
    watchPublicGame(
        @Root('publicGame') publicGame: SubscriptionIterator<GameEntity>,
        @Arg('gameId') gameId: string
    ) {
        return publicGame;
    }
}
export default GameResolver;

import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { GameEntity } from '../entities/GameEntity';
import { Game } from '../game/Game';
import { MyContext, SubscriptionIterator } from '../types';
import { getAccountIdFromCookie } from '../utils/auth/getAccountFromCookie';

@Resolver()
class GameResolver {
    @Query(() => Game)
    async game(@Arg('id') id: string) {
        const game = Game.get(id);
        if (!game) throw new Error(`Game not found with id: ${id}`);
        return game;
    }

    @Mutation(() => Boolean)
    async endTurn(
        @Arg('gameId') gameId: string,
        @Ctx() { accountId }: MyContext
    ) {
        if (!accountId) throw new Error('No authorization cookie found');
        const game = Game.get(gameId);
        if (!game) throw new Error(`Game not found with id: ${gameId}`);
        const player = game.getPlayerByAccountId(accountId);
        if (!player) throw new Error(`Player not found with id: ${accountId}`);
        if (game.turn !== player.uuid) {
            throw new Error(`It is not your turn!`);
        }
        game.endTurn();
        game.logs.push(`${player.account.userName} ended their turn.`);
        await Game.publishGame(game);
        return true;
    }

    @Mutation(() => Boolean)
    async playCard(
        @Arg('gameId') gameId: string,
        @Arg('cardUuid') cardUuid: string,
        @Arg('targetUuid', { nullable: true }) targetUuid: string,
        @Ctx() { accountId }: MyContext
    ) {
        //Validation Step
        if (!accountId) throw new Error('No authorization cookie found');

        const game = Game.get(gameId);
        if (!game) throw new Error(`Game not found with id: ${gameId}`);
        const player = game.getPlayerByAccountId(accountId);
        if (!player)
            throw new Error(`You are not a player in game with id: ${gameId}`);
        const card = player.hand.findCard(cardUuid);
        if (!card)
            throw new Error(
                `Card not found with uuid: ${cardUuid} in player's hand`
            );
        if (game.turn !== player.uuid) {
            throw new Error(`It is not your turn!`);
        }
        //Remove the card from the hand
        player.playCard(card);
        //Log action

        game.logs.logs.push(`${player.account.userName} played ${card.name}.`);
        await Game.publishGame(game);
        let newCode = card.code;
        if (card.code.includes('$')) {
            newCode = newCode.replace('$', targetUuid);
        }
        //Run interpreter
        await game.executeAction(player.uuid, newCode, card.uuid);
        //Publish changes
        await Game.publishGame(game);
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
        @Ctx() { accountId }: MyContext
    ) {
        const privateGame = Game.get(gameId);
        if (!privateGame) throw new Error(`Game not found with id: ${gameId}`);
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
        if (!accountId) throw new Error('No authorization cookie found');
        if (!privateGame) throw new Error(`Game not found with id: ${gameId}`);
        if (!privateGame.players.find((p) => p.account.id === accountId)) {
            console.log('Whoops');
            throw new Error(`You are not a player in game with id: ${gameId}`);
        }
        return {
            ...privateGame,
            players: privateGame.players.filter((p) => {
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

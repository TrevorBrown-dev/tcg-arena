import { useState, useEffect, useCallback } from 'react';
import {
    useCreateGameMutation,
    useUpdateGameMutation,
    useWatchGameSubscription,
    useGameQuery,
    Game,
} from '../generated/graphql';
import { Button } from './library/Button';

export const WSTest: React.FC = () => {
    const [createGameResponse, createGame] = useCreateGameMutation();

    useEffect(() => {
        createGame({
            player1: 1,
            player2: 2,
        });
    }, []);
    const [, updateGame] = useUpdateGameMutation();

    const [game] = useGameQuery({
        variables: { id: 1 },
    });

    const [gameState, setGameState] = useState<Game | null>(null);
    const [watchGame] = useWatchGameSubscription(
        {
            variables: { gameId: 1 },
        },
        (prev, data) => {
            console.log(prev, data);
            setGameState({
                ...gameState,
                ...(data.watchGame as Game),
            });
            console.log(gameState);
            return data;
        }
    );

    useEffect(() => {
        if (game?.data?.game) {
            setGameState(game.data.game);
        }
    }, [game.data?.game]);

    const attack = async (player: number) => {
        if (!gameState) return;
        if (player === 1) {
            await updateGame({
                id: 1,
                data: {
                    player1Health: gameState!.player1Health - 1,
                    player2Health: gameState!.player2Health,
                },
            });
        }
        if (player === 2) {
            await updateGame({
                id: 1,
                data: {
                    player1Health: gameState!.player1Health,
                    player2Health: gameState!.player2Health - 1,
                },
            });
        }
    };

    return (
        <div>
            <h1>Game</h1>
            <h1>Player 1: {gameState?.player1Health}</h1>
            <h1>Player 2: {gameState?.player2Health}</h1>
            <Button
                onClick={() => {
                    attack(1);
                }}
            >
                Attack Player 1
            </Button>
            <Button
                onClick={() => {
                    attack(2);
                }}
            >
                Attack Player 2
            </Button>
        </div>
    );
};

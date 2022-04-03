import {
    useMeQuery,
    PrivateGamePartsFragment,
    useInitialPrivateGameQuery,
    useWatchPrivateGameSubscription,
} from '@graphql-gen';
import { useState, useEffect } from 'react';
import { useLobbyContext } from '../lobbyContext';

export const usePrivateGame = (accountId: number) => {
    const lobby = useLobbyContext();

    const [privateGame, setPrivateGame] = useState<PrivateGamePartsFragment>();

    const [initialPrivateGame] = useInitialPrivateGameQuery({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
            accountId,
        },
    });

    useEffect(() => {
        if (initialPrivateGame.data) {
            setPrivateGame(initialPrivateGame.data.initialPrivateGame);
        }
    }, [initialPrivateGame.data?.initialPrivateGame]);

    const [privateGameResponse] = useWatchPrivateGameSubscription({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
            accountId,
        },
    });

    useEffect(() => {
        if (privateGameResponse.data) {
            setPrivateGame(privateGameResponse.data.watchPrivateGame);
        }
    }, [privateGameResponse.data]);

    return privateGame;
};

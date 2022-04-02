import {
    useMeQuery,
    PrivateGamePartsFragment,
    useInitialPrivateGameQuery,
    useWatchPrivateGameSubscription,
    useMyInitialPrivateGameQuery,
    useWatchMyPrivateGameSubscription,
} from '@graphql-gen';
import { useState, useEffect } from 'react';
import { useLobbyContext } from '../lobbyContext';

export const useMyPrivateGame = () => {
    const lobby = useLobbyContext();

    const [privateGame, setPrivateGame] = useState<PrivateGamePartsFragment>();

    const [initialPrivateGame] = useMyInitialPrivateGameQuery({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        if (initialPrivateGame.data) {
            setPrivateGame(initialPrivateGame.data.myInitialPrivateGame);
        }
    }, [initialPrivateGame.data?.myInitialPrivateGame]);

    const [privateGameResponse] = useWatchMyPrivateGameSubscription({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        if (privateGameResponse.data) {
            setPrivateGame(privateGameResponse.data.watchMyPrivateGame);
        }
    }, [privateGameResponse.data?.watchMyPrivateGame]);

    return privateGame;
};

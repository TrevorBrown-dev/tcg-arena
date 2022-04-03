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
    }, [initialPrivateGame.fetching]);

    const [privateGameResponse] = useWatchMyPrivateGameSubscription({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        if (privateGameResponse.data) {
            console.log('We got cards?', privateGameResponse);
            setPrivateGame(privateGameResponse.data.watchMyPrivateGame);
        }
    }, [privateGameResponse.data?.watchMyPrivateGame]);

    useEffect(() => {
        console.log('ERROR', privateGameResponse.error);
    }, [privateGameResponse.error]);

    return privateGame;
};

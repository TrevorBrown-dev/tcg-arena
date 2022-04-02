import {
    PublicGamePartsFragment,
    useInitialPublicGameQuery,
    useWatchPublicGameSubscription,
} from '@graphql-gen';
import { useState, useEffect } from 'react';
import { useLobbyContext } from '../lobbyContext';

export const usePublicGame = () => {
    const lobby = useLobbyContext();

    const [publicGame, setPublicGame] = useState<PublicGamePartsFragment>();

    const [initialPublicGame] = useInitialPublicGameQuery({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        if (initialPublicGame.data) {
            setPublicGame(initialPublicGame.data.initialPublicGame);
        }
    }, [initialPublicGame.data?.initialPublicGame]);

    const [publicGameResponse] = useWatchPublicGameSubscription({
        pause: !lobby.gameId,
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        if (publicGameResponse.data) {
            setPublicGame(publicGameResponse.data.watchPublicGame);
        }
    }, [publicGameResponse.data?.watchPublicGame]);

    return publicGame;
};

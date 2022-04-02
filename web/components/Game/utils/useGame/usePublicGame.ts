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
    const [initialPublicGame, reExecute] = useInitialPublicGameQuery({
        variables: {
            gameId: lobby.gameId!,
        },
    });

    useEffect(() => {
        console.log('FETCHING');
        if (initialPublicGame.data) {
            console.log(initialPublicGame);
            setPublicGame(initialPublicGame.data.initialPublicGame);
        }
    }, [initialPublicGame.fetching]);

    const [publicGameResponse, fetch] = useWatchPublicGameSubscription(
        {
            variables: {
                gameId: lobby.gameId!,
            },
        },
        (prev, next) => {
            setPublicGame(next.watchPublicGame);
            return next;
        }
    );

    useEffect(() => {
        if (publicGameResponse.data) {
            setPublicGame(publicGameResponse.data.watchPublicGame);
        }
    }, [publicGameResponse.data]);

    return publicGame;
};

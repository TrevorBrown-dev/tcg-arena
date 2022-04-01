import {
    PreGameLobbyPartsFragment,
    useWatchPreGameLobbySubscription,
} from '@graphql-gen';
import { Loading } from 'components/Loading';
import { createContext, useContext } from 'react';
import { GameLobby } from './GameLobby';
import { PreGameLobby } from './PreGameLobby';

type Props = {
    lobbyId: string;
};

const lobbyContext = createContext<PreGameLobbyPartsFragment | null>(null);
export const useLobbyContext = () => useContext(lobbyContext)!;

export const GameOrPreGame: React.FC<Props> = ({ lobbyId }) => {
    const [lobbyResponse] = useWatchPreGameLobbySubscription({
        variables: {
            id: lobbyId,
        },
    });

    console.log('LOBBY', lobbyResponse);
    const lobby = lobbyResponse?.data?.watchPreGameLobby;
    if (!lobby || lobbyResponse.fetching) {
        return <Loading />;
    }

    return (
        <lobbyContext.Provider value={lobby!}>
            {!lobby.gameId && <PreGameLobby />}
            {lobby.gameId && <GameLobby />}
        </lobbyContext.Provider>
    );
};

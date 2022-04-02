import { useWatchPreGameLobbySubscription } from '@graphql-gen';
import { Loading } from 'components/Loading';
import { GameLobby } from './GameLobby';
import { PreGameLobby } from './PreGameLobby';
import { lobbyContext } from './utils/lobbyContext';

type Props = {
    lobbyId: string;
};

export const GameOrPreGame: React.FC<Props> = ({ lobbyId }) => {
    const [lobbyResponse] = useWatchPreGameLobbySubscription({
        variables: {
            id: lobbyId,
        },
    });

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

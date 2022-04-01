import { LobbyPartsFragment, PreGameLobbyPartsFragment } from '@graphql-gen';
import { useLobbyContext } from './GameOrPreGame';

export const GameLobby: React.FC = () => {
    const lobby = useLobbyContext();

    //
    return (
        <div>
            <h1>I fear the day this has html in it</h1>
        </div>
    );
};

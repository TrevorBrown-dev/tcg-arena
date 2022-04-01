import { useMeQuery } from '@graphql-gen';
import { useLobbyContext } from '../GameOrPreGame';

export const useGetPlayers = () => {
    const [me] = useMeQuery();
    const lobby = useLobbyContext();

    const myPlayer = lobby.players.find(
        (p) => p.account.id === me.data?.me?.id
    );
    const otherPlayer = lobby.players.find(
        (p) => p.account.id !== me.data?.me?.id
    );

    return { myPlayer, otherPlayer };
};

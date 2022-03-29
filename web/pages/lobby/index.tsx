import { collectTypesFromResponse } from '@urql/core/dist/types/utils';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '../../components/library/Button';
import { useCreateLobbyMutation, useMeQuery } from '../../generated/graphql';
export const Lobby: NextPage = () => {
    const [me] = useMeQuery();
    const [, createLobby] = useCreateLobbyMutation();
    const router = useRouter();
    console.log(me);
    const startLobby = async () => {
        if (!me.data?.me) return;
        const lobby = await createLobby({
            creatorId: me.data?.me.id,
        });
        if (lobby.error) {
            console.log(lobby.error);
            return;
        }
        router.push(`/lobby/${lobby.data?.createLobby.id}`);
    };
    return (
        <div>
            <h1>Create Lobby</h1>
            <Button onClick={startLobby}>Start Lobby</Button>
        </div>
    );
};
export default Lobby;

import { collectTypesFromResponse } from '@urql/core/dist/types/utils';
import { Input } from 'components/library/Input';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SidebarNavLayout } from '../../components/layout/SidebarNavLayout';
import { Button } from '../../components/library/Button';
import { useCreateLobbyMutation, useMeQuery } from '../../generated/graphql';

const StyledLobby = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-off-secondary);
    gap: 1em;
    .join-lobby {
        display: flex;
        font-size: 1em;
    }
`;

export const Lobby: NextPage = () => {
    const [me] = useMeQuery();
    const [, createLobby] = useCreateLobbyMutation();
    const router = useRouter();
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
    const [roomCode, setRoomCode] = useState('');
    return (
        <SidebarNavLayout>
            <StyledLobby>
                <div className="join-lobby">
                    <Input
                        placeholder="Room Code"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value || '')}
                    />

                    <Link href={`/lobby/${roomCode}`}>
                        <Button>Join</Button>
                    </Link>
                </div>
                <Button onClick={startLobby}>Create Lobby</Button>
            </StyledLobby>
        </SidebarNavLayout>
    );
};
export default Lobby;

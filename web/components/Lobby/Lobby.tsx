import { useMeQuery, useWatchLobbySubscription } from '@graphql-gen';
import { Button } from 'components/library/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ChatSection } from './ChatSection';
import { Participant, Participants } from './Participants';

const LobbyLayout = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    .container {
        height: 100%;
        display: flex;
        flex: 1;
    }
`;

const LobbyHeader = styled.header`
    padding: 1em 5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LobbyContainer = styled.div`
    flex: 1;
    color: var(--color-dark);
    background-color: var(--color-light);
    padding: 1em;
    height: 100%;
`;

const LobbySidebar = styled.aside`
    width: 20em;
    padding: 1em;
    background-color: var(--color-secondary);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

type Props = {
    lobbyId: string;
};
export const Lobby: React.FC<Props> = ({ lobbyId }) => {
    const [me] = useMeQuery();
    const [lobby] = useWatchLobbySubscription({
        pause: !me.data?.me,
        variables: {
            watchLobbyId: lobbyId! as string,
        },
    });
    const router = useRouter();
    useEffect(() => {
        console.log('WATCHING LOBBY', lobby);
    }, [lobby]);

    useEffect(() => {
        if (lobby.error) {
            router.push('/');
        }
    }, [lobby.error]);

    const members = lobby.data?.watchLobby.members;
    return (
        <>
            <LobbyLayout>
                <LobbyHeader className="lobby-info">
                    <div className="left">
                        <strong>Room Code: {lobbyId}</strong>
                    </div>
                    <div className="right">
                        <Link href="/">
                            <Button className="warning">Leave</Button>
                        </Link>
                    </div>
                </LobbyHeader>
                <div className="container">
                    <LobbyContainer></LobbyContainer>
                    <LobbySidebar>
                        <Participants
                            participants={(members as Participant[]) || []}
                            style={{ flex: '1' }}
                        />
                        <ChatSection lobbyId={lobbyId} style={{ flex: '1' }} />
                    </LobbySidebar>
                </div>
            </LobbyLayout>
        </>
    );
};

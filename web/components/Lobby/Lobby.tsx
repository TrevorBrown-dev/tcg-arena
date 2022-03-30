import { useMeQuery, useWatchLobbySubscription } from '@graphql-gen';
import { useEffect } from 'react';
import styled from 'styled-components';
import { ChatSection } from './ChatSection';
import { Participant, Participants } from './Participants';

const LobbyLayout = styled.div`
    display: flex;
    height: 100%;
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

    useEffect(() => {
        console.log('WATCHING LOBBY', lobby);
    }, [lobby]);

    const members = lobby.data?.watchLobby.members;
    return (
        <LobbyLayout>
            <LobbyContainer>
                <h2>{lobbyId}</h2>
            </LobbyContainer>
            <LobbySidebar>
                <Participants
                    participants={(members as Participant[]) || []}
                    style={{ flex: '1' }}
                />
                <ChatSection lobbyId={lobbyId} style={{ flex: '1' }} />
            </LobbySidebar>
        </LobbyLayout>
    );
};

import { PreGameLobbyPartsFragment, useMeQuery } from '@graphql-gen';
import styled from 'styled-components';
import { BigReadyCheck } from './components/BigReadyCheck';
import { PreGameLobbyHeader } from './components/PreGameLobbyHeader';
import { SelectMyDeck } from './components/SelectMyDeck';
import { useLobbyContext } from './utils/lobbyContext';
import { useGetPlayers } from './utils/useGetPlayers';

const StyledPreGameLobby = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .main {
        flex: 1;

        background-color: var(--color-light);
        color: var(--color-dark);

        height: 100%;
        display: flex;
    }
    .ready-check {
        display: flex;
        flex: 1;
        .left {
            border-right: 2px solid var(--color-dark);
        }
        .left,
        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
`;

export const PreGameLobby: React.FC = () => {
    const [me] = useMeQuery();
    const lobby = useLobbyContext();

    const { myPlayer, otherPlayer } = useGetPlayers();

    return (
        <StyledPreGameLobby>
            <PreGameLobbyHeader />
            <main className="main">
                <SelectMyDeck />
                <div className="ready-check">
                    <div className="left">
                        <BigReadyCheck player={myPlayer!} />
                    </div>
                    <div className="right">
                        <BigReadyCheck player={otherPlayer!} />
                    </div>
                </div>
            </main>
        </StyledPreGameLobby>
    );
};

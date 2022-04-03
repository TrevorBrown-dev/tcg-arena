import { useReadyUpMutation } from '@graphql-gen';
import { useLobbyContext } from 'components/Game/utils/lobbyContext';
import { useGetPlayers } from 'components/Game/utils/useGetPlayers';
import styled from 'styled-components';

type StyledProps = {
    ready: boolean;
};

type Props = {
    player: {
        id: string;
        ready: boolean;
    };
};

const StyledBigReadyCheck = styled.div<StyledProps>`
    .ready {
        cursor: pointer;
        font-size: 10em;
        color: ${(props) => (props.ready ? 'green' : 'var(--color-medium)')};
    }
`;

export const BigReadyCheck: React.FC<Props> = ({ player }) => {
    const [, readyUp] = useReadyUpMutation();
    const lobby = useLobbyContext();
    const { myPlayer } = useGetPlayers();
    return (
        <StyledBigReadyCheck
            ready={player?.ready}
            onClick={() => {
                if (myPlayer?.id === player.id) {
                    readyUp({ preGameLobbyId: lobby.id });
                }
            }}
        >
            <span className="material-icons-outlined ready">done</span>
        </StyledBigReadyCheck>
    );
};

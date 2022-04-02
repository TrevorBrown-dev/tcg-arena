import { useGetPlayers } from 'components/Game/utils/useGetPlayers';
import styled from 'styled-components';

const StyledHeader = styled.header`
    padding: 1em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .player {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
`;
export const PreGameLobbyHeader: React.FC = () => {
    const { myPlayer, otherPlayer } = useGetPlayers();
    return (
        <StyledHeader>
            <div className="player">
                <h1>{myPlayer?.account.userName}</h1>
                {/* Make this a little component later vvvvv */}
                {myPlayer?.ready && (
                    <span
                        className="material-icons-outlined"
                        style={{
                            fontSize: '2.8em',
                        }}
                    >
                        done
                    </span>
                )}
            </div>
            <h2>VS</h2>
            <div className="player">
                <h1>{otherPlayer?.account.userName}</h1>
                {otherPlayer?.ready && (
                    <span
                        className="material-icons-outlined"
                        style={{
                            fontSize: '2.8em',
                        }}
                    >
                        done
                    </span>
                )}
            </div>
        </StyledHeader>
    );
};

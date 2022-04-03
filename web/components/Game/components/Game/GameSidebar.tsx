import { useGameContext } from 'components/Game/utils/useGame/useGame';
import styled from 'styled-components';

const StyledGameSidebar = styled.aside`
    display: flex;
    padding: 1em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    .my-player,
    .other-player {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    .player-info {
        text-align: center;
    }

    .other-player {
        justify-content: flex-end;
        .player-info {
            display: flex;
            flex-direction: column-reverse;
        }
    }

    .my-player {
        justify-content: space-between;
    }
    hr {
        width: 100%;
    }
`;

export const GameSidebar: React.FC = () => {
    const game = useGameContext();
    return (
        <StyledGameSidebar>
            <div className="other-player">
                <div className="player-info">
                    <h1>{game.otherPlayer?.account.userName}</h1>
                    <h2>
                        <span className="material-icons-outlined">
                            favorite
                        </span>{' '}
                        {game.otherPlayer?.health}
                    </h2>
                </div>
            </div>
            <hr />
            <div className="my-player">
                <div className="player-info">
                    <h1>{game.myPlayer.account?.userName}</h1>
                    <h2>
                        <span className="material-icons-outlined">
                            favorite
                        </span>{' '}
                        {game.myPlayer.health}
                    </h2>
                </div>

                <div className="logs">
                    {game.publicGame?.logs?.logs.map((log, i) => {
                        return <div>{log}</div>;
                    })}
                </div>
            </div>
        </StyledGameSidebar>
    );
};

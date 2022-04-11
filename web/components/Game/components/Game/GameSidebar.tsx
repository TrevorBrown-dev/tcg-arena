import { useEndTurnMutation } from '@graphql-gen';
import { SelectTarget } from 'components/Game/utils/SelectTarget';
import { useTargetContext } from 'components/Game/utils/Targeting';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { Button } from 'components/library/Button';
import styled from 'styled-components';
import { Logs } from './Logs';
import { Resources } from './Resources';

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
        display: flex;
        flex-direction: column;
        gap: 1em;
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
    const [, endTurn] = useEndTurnMutation();
    const { targetState, cancel } = useTargetContext();
    return (
        <StyledGameSidebar>
            <div className="other-player">
                <div className="player-info">
                    <h1>{game.otherPlayer?.account.userName}</h1>
                    <Resources player={game.otherPlayer as any} />
                </div>
            </div>
            <hr />
            <div className="my-player">
                <div className="player-info">
                    <h1>{game.myPlayer.account?.userName}</h1>
                    <Button
                        disabled={game.myPlayer.uuid !== game.publicGame?.turn}
                        onClick={() => {
                            if (game.myPlayer.uuid !== game.publicGame?.turn)
                                return;
                            endTurn({ gameId: game.lobby.gameId! });
                        }}
                    >
                        End Turn
                    </Button>
                    <Resources player={game.myPlayer as any} />
                </div>
                <div>
                    <SelectTarget style={{ marginBottom: '1em' }} />
                    <Logs />
                </div>
            </div>
        </StyledGameSidebar>
    );
};

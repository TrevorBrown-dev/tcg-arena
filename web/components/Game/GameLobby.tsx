import { Loading } from 'components/Loading';
import { SelectResource } from './SelectResource';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Game } from './components/Game/Game';
import { GameSidebar } from './components/Game/GameSidebar';
import { TargetStateLayout } from './utils/Targeting';
import { gameContext, useGame } from './utils/useGame/useGame';

const GameLayout = styled.div`
    display: flex;
    height: 100%;
    flex: 1;
    /*! REMOVE THIS LATER */
    overflow: hidden;
`;

export const GameLobby: React.FC = () => {
    const game = useGame();
    useEffect(() => {
        console.log('GAME UPDATED', game);
    }, [game]);
    if (!game || !game.lobby || !game.privateGame || !game.publicGame) {
        return <Loading />;
    }

    const selectResourceVisible =
        !!game.myPlayer.resourcesLeftToSelect &&
        game.myPlayer.resourcesLeftToSelect > 0 &&
        game.publicGame.turn === game.myPlayer.uuid;

    return (
        <gameContext.Provider value={game}>
            {selectResourceVisible && <SelectResource />}
            <TargetStateLayout>
                <GameLayout>
                    <GameSidebar />
                    <Game />
                </GameLayout>
            </TargetStateLayout>
        </gameContext.Provider>
    );
};

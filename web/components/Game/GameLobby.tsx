import { Loading } from 'components/Loading';
import { useEffect } from 'react';
import { MyHand } from './components/Game/MyHand';
import { OpponentHand } from './components/Game/OpponentHand';
import { PlayFields } from './components/Game/PlayFields';
import { gameContext, useGame } from './utils/useGame/useGame';

export const GameLobby: React.FC = () => {
    const game = useGame();
    useEffect(() => {
        console.log('GAME UPDATED', game);
    }, [game]);
    if (!game || !game.lobby || !game.privateGame || !game.publicGame) {
        return <Loading />;
    }

    return (
        <gameContext.Provider value={game}>
            <div style={{ height: '100%' }}>
                <div
                    className="flex"
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        flex: 1,
                    }}
                >
                    <OpponentHand />
                    <PlayFields />
                    <MyHand />
                </div>
            </div>
        </gameContext.Provider>
    );
};

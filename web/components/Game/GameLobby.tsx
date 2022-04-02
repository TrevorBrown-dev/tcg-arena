import { usePlayCardMutation } from '@graphql-gen';
import { Card } from 'components/Card/Card';
import { BlankCard } from 'components/Card/CardLayout';
import { Loading } from 'components/Loading';
import { useEffect } from 'react';
import { PlayFields } from './components/Game/PlayFields';
import { useGame } from './utils/useGame/useGame';

export const GameLobby: React.FC = () => {
    const game = useGame();
    const [, playCard] = usePlayCardMutation();
    useEffect(() => {
        console.log('GAME UPDATED', game);
    }, [game]);
    if (!game || !game.lobby || !game.privateGame || !game.publicGame) {
        return <Loading />;
    }

    return (
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
                <div className="flex">
                    {new Array(game.otherPlayer?.hand.numCardsInHand || 0)
                        .fill(0)
                        .map((_, i) => {
                            return <BlankCard key={i} />;
                        })}
                </div>
                <PlayFields />
                <div className="flex">
                    {game.myPlayer.hand.cards?.map((card, i) => (
                        <Card
                            onClick={() => {
                                if (!game?.lobby.gameId) return;
                                playCard({
                                    gameId: game.lobby.gameId,
                                    uuid: card.uuid,
                                });
                            }}
                            key={i}
                            cardRecord={{ card, isFoil: card.isFoil } as any}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

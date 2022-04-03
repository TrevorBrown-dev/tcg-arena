import { usePlayCardMutation } from '@graphql-gen';
import { Card } from 'components/Card/Card';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { StyledHand } from './StyledHand';

export const MyHand: React.FC = () => {
    const game = useGameContext();
    const [, playCard] = usePlayCardMutation();
    return (
        <StyledHand>
            <div className="container">
                {game?.myPlayer?.hand?.cards &&
                    game.myPlayer.hand.cards.map((card, i) => (
                        <Card
                            key={i}
                            onClick={() => {
                                if (!game?.lobby.gameId) return;
                                console.log(game.lobby.gameId);
                                playCard({
                                    gameId: game.lobby.gameId,
                                    uuid: card.uuid,
                                });
                            }}
                            cardRecord={{ card, isFoil: card.isFoil } as any}
                        />
                    ))}
            </div>
        </StyledHand>
    );
};

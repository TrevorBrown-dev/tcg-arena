import { BlankCard } from 'components/Card/CardLayout';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { DeckDiscard, HandContainer } from './MyHand';
import { StyledHand } from './StyledHand';

export const OpponentHand: React.FC = () => {
    const game = useGameContext();
    return (
        <HandContainer>
            <StyledHand>
                <div className="container">
                    {new Array(game?.otherPlayer?.hand?.numCardsInHand || 0)
                        .fill(0)
                        .map((_, i) => {
                            return <BlankCard key={i} flipped={true} />;
                        })}
                </div>
            </StyledHand>
            <DeckDiscard player={game.otherPlayer as any} flipped={true} />
        </HandContainer>
    );
};

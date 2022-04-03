import { BlankCard } from 'components/Card/CardLayout';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { StyledHand } from './StyledHand';

export const OpponentHand: React.FC = () => {
    const game = useGameContext();
    return (
        <StyledHand>
            {new Array(game?.otherPlayer?.hand?.numCardsInHand || 0)
                .fill(0)
                .map((_, i) => {
                    return <BlankCard key={i} />;
                })}
        </StyledHand>
    );
};

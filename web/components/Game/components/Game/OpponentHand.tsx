import { BlankCard } from 'components/Card/CardLayout';
import { useGameContext } from 'components/Game/utils/useGame/useGame';

export const OpponentHand: React.FC = () => {
    const game = useGameContext();
    return (
        <div className="flex">
            {new Array(game?.otherPlayer?.hand?.numCardsInHand || 0)
                .fill(0)
                .map((_, i) => {
                    return <BlankCard key={i} />;
                })}
        </div>
    );
};

import { Card } from 'components/Card/Card';
import { useGameContext } from 'components/Game/utils/useGame/useGame';
import styled from 'styled-components';

const StyledPlayFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: center;
`;

const StyledPlayField = styled.div`
    padding: 0 5em;
    display: flex;
    gap: 0.5em;
    .spacer {
        font-size: 0.8em;
        height: 20em;
        ::before {
            content: '';
            display: block;
        }
    }
`;

const PlayField: React.FC<{ playerId?: string }> = ({ playerId }) => {
    const game = useGameContext();
    const playField = game?.publicGame?.players?.find(
        (player) => player.id === playerId
    )?.playField;
    return (
        <StyledPlayField>
            <div className="spacer"></div>
            {playField?.cards?.map((card, i) => {
                return (
                    <Card key={i} cardRecord={{ card, isFoil: true } as any} />
                );
            })}
        </StyledPlayField>
    );
};

export const PlayFields: React.FC = () => {
    const game = useGameContext();
    return (
        <StyledPlayFields>
            <PlayField playerId={game?.otherPlayer?.id} />
            <hr />
            <PlayField playerId={game?.myPlayer?.id} />
        </StyledPlayFields>
    );
};

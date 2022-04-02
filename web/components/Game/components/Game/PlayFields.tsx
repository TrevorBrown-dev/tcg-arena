import { PlayFieldPartsFragment } from '@graphql-gen';
import { Card } from 'components/Card/Card';
import { useGame } from 'components/Game/utils/useGame/useGame';
import styled from 'styled-components';

const StyledPlayFields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

const StyledPlayField = styled.div`
    display: flex;
    gap: 0.5em;
`;

const PlayField: React.FC<{ playField: PlayFieldPartsFragment }> = ({
    playField,
}) => {
    return (
        <StyledPlayField>
            {playField?.cards?.map((card, i) => {
                return (
                    <Card key={i} cardRecord={{ card, isFoil: true } as any} />
                );
            })}
        </StyledPlayField>
    );
};

export const PlayFields: React.FC = () => {
    const game = useGame();
    return (
        <StyledPlayFields>
            <PlayField playField={game?.otherPlayer?.playField!} />
            <PlayField playField={game?.myPlayer?.playField!} />
        </StyledPlayFields>
    );
};

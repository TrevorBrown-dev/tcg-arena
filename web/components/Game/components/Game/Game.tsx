import styled from 'styled-components';
import { MyHand } from './Hand/MyHand';
import { OpponentHand } from './Hand/OpponentHand';
import { PlayFields } from './PlayFields';
const StyledGame = styled.main`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
    background-color: var(--color-light);
    color: var(--color-dark);
`;
export const Game: React.FC = () => {
    return (
        <StyledGame>
            <OpponentHand />
            <PlayFields />
            <MyHand />
        </StyledGame>
    );
};

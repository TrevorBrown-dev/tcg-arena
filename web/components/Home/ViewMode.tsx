import styled from 'styled-components';
import { MyCardLibrary } from './MyCardLibrary';
import { MyDecks } from './MyDecks';

const StyledViewMode = styled.div`
    display: flex;
`;

export const ViewMode: React.FC = () => {
    return (
        <StyledViewMode>
            <MyCardLibrary />
            <MyDecks />
        </StyledViewMode>
    );
};

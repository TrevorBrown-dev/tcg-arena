import styled from 'styled-components';
import { MyCardLibrary } from './MyCardLibrary';
import { MyDecks } from './MyDecks';

export const StytledMode = styled.div`
    display: flex;
`;

export const ViewMode: React.FC = () => {
    return (
        <StytledMode>
            <MyCardLibrary />
            <MyDecks />
        </StytledMode>
    );
};

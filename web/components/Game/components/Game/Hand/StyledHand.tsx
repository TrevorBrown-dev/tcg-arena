import styled from 'styled-components';

export const StyledHand = styled.div`
    display: flex;
    flex: 2;
    min-width: 0;
    width: 100%;
    overflow-y: hidden;
    .container {
        overflow-y: hidden;
        margin: 0.4em 1em;
        display: flex;
        @media (min-width: 1200px) {
            justify-content: center;
            gap: 0.3em;
        }
        flex: 1;
        overflow-x: auto;
    }
`;

import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1em;

    .row {
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        max-width: 100vw;
        * {
            flex: 1;
        }
        gap: 0.5em;
    }
`;

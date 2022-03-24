import styled, { StyledComponent } from 'styled-components';

export const Input = styled.input`
    border-radius: 100px;
    outline: none;
    border: none;
    padding: 0.8em 0.8em;
    font-size: 1.6rem;
    display: block;
    max-width: 100vw;
    &:focus {
        outline-offset: 2px;
        outline: 2px solid var(--color-light);
    }
`;

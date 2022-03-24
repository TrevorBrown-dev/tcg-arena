import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 20rem;
    background-color: var(--color-primary);
    color: var(--color-light);
    border: 2px solid var(--color-primary);
    padding: 1em;
    font-size: 1.6rem;
    font-weight: bold;

    transition: all 0.2s ease-in-out;

    &:disabled {
        background-color: var(--color-light);
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        cursor: not-allowed;
    }
`;

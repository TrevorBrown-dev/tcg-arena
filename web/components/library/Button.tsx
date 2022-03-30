import styled from 'styled-components';

export const Button = styled.button`
    border-radius: 20rem;
    background-color: var(--color-primary);
    color: var(--color-dark);
    border: 2px solid var(--color-primary);
    padding: 1em;
    font-size: 1.6em;
    font-weight: bold;

    transition: all 0.2s ease-in-out;

    &:disabled {
        --main-color: var(--color-medium);
        background-color: var(--main-color);
        color: var(--color-off-dark);
        border: 2px solid var(--main-color);
        cursor: not-allowed;
    }
`;

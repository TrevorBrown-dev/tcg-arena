import { css } from 'styled-components';

export const Animations = css`
    .pop-out {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.02);
        }
    }
`;

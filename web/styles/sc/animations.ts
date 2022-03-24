import { css } from 'styled-components';

export const Animations = css`
    .pop-out {
        transition: all 0.3s ease-in-out;
        cursor: pointer;
        &:hover {
            transform: scale(1.02);
        }
    }

    @keyframes float {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
        100% {
            transform: translateY(0);
        }
    }
    .float {
        /* animation: float 2s ease-in-out infinite; */
        rotate: 55deg;
    }
`;

import { css } from 'styled-components';

export const Layout = css`
    html {
        color: $color-light;
        background-color: $color-light;
    }

    @media (max-width: 768px) {
        html {
            font-size: 50%;
        }
    }
`;

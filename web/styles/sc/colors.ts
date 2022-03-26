import { css } from 'styled-components';

export const Palette = {
    primary: '#8AF3FF',
    primaryLight: '#C2F9FF',
    offPrimary: '#2274A5',
    secondary: '#1b0a65',
    offSecondary: '#BE97FF',
    warning: '#dc3545',
    warningText: '#721c2a',
    offWarning: '#f8d7da',
    light: '#fff',
    offLight: '#f9f9f9',
    medium: '#d1d1d1',
    dark: '#1d013a',
    offDark: '#29262C',
};

export const ColorPalette = css`
    $color-primary: ${Palette.primary};
    $color-primary-light: ${Palette.primaryLight};
    $color-off-primary: ${Palette.offPrimary};

    $color-secondary: ${Palette.secondary};
    $color-off-secondary: ${Palette.offSecondary};

    $color-warning: ${Palette.warning};
    $color-warning-text: ${Palette.warningText};
    $color-off-warning: ${Palette.offWarning};

    $color-light: ${Palette.light};
    $color-off-light: ${Palette.offLight};

    $color-medium: ${Palette.medium};

    $color-dark: ${Palette.dark};
    $color-off-dark: ${Palette.offDark};
    html {
        --color-primary: ${Palette.primary};
        --color-primary-light: ${Palette.primaryLight};
        --color-off-primary: ${Palette.offPrimary};

        --color-secondary: ${Palette.secondary};
        --color-off-secondary: ${Palette.offSecondary};

        --color-dark: ${Palette.dark};
        --color-off-dark: ${Palette.offDark};
        --color-light: ${Palette.light};
        --color-off-light: ${Palette.offLight};
        --color-medium: ${Palette.medium};

        --color-warning: ${Palette.warning};
        --color-warning-text: ${Palette.warningText};
        --color-off-warning: ${Palette.offWarning};
    }
`;

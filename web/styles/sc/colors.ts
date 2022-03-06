import { css } from 'styled-components';

export const Palette = {
    primary: '#5f75de',
    primaryLight: '#7e90e4',
    offPrimary: '#5569c7',
    secondary: '#04afa6',
    offSecondary: '#039c9c',
    warning: '#dc3545',
    warningText: '#721c2a',
    offWarning: '#f8d7da',
    light: '#fff',
    offLight: '#f9f9f9',
    medium: '#d1d1d1',
    dark: '#2a2a2a',
    offDark: 'lighten($color-dark, 10%)',
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

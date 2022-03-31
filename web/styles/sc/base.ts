import { css } from 'styled-components';

export const Base = css`
    /* 
Base settings inspired by Sakura CSS.
https://github.com/oxalorg/sakura
*/

    :root {
        --scrollbar-width: 50px;
    }

    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }
    html {
        scroll-behavior: smooth;
        font-size: 62.5%;
        font-family: 'Roboto', sans-serif;
        font-weight: 200;
        height: 100%;
    }
    body {
        height: 100%;
    }
    label {
        cursor: pointer;
        user-select: none;
    }

    button {
        cursor: pointer;
        outline: none;
        border: none;
    }

    a,
    a:link,
    a:visited {
        text-decoration: none;
        color: inherit;
    }

    a:hover {
        text-decoration: underline;
    }

    p {
        line-height: 1.3em;
    }
    ul {
        list-style-type: none;
    }

    body {
        font-size: 1.6rem;
        box-sizing: border-box;
        margin: 0;
    }

    h1 {
        font-size: 235%;
    }

    h2 {
        font-size: 200%;
    }

    h3 {
        font-size: 175%;
    }

    h4 {
        font-size: 150%;
    }
    h5 {
        font-size: 125%;
    }
    h6 {
        font-size: 100%;
    }

    #root {
        // font-size: 2.4rem;
    }
    div[id^='__lpform_'] {
        display: none;
    }
    .center-text {
        text-align: center;
    }

    .center-content {
        display: grid;
        place-items: center;
    }

    .color {
        &-primary {
            color: $color-primary;
        }
        &-light {
            color: $color-light;
        }
        &-dark {
            color: $color-dark;
        }
    }

    .hoverable {
        @include hover-animation-text(-0.1em, 0);

        &-children > * {
            @include hover-animation-text(-0.1em, 0);
        }

        &-half {
            @include hover-animation-text(-0.05em, 0);
        }
        &-double {
            @include hover-animation-text(-0.2em, 0);
        }
    }

    $width_tablet: 1200px;
    $width_phone: 850px;
    $width_phone_small: 750px;
    $width_phone_tiny: 600px;
    $mq-mobile-s: 320px;
    $mq-mobile-m: 375px;
    $mq-mobile-l: 425px;
    $mq-mobile-l: 425px;
    $mq-tablet: 768px;
    $mq-laptop: 1024px;
    $mq-laptop-l: 1440px;
    .flex {
        display: flex;

        &.around {
            justify-content: space-around;
        }

        &.between {
            justify-content: space-between;
        }
    }
    .center-grid-justified {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .left {
            text-align: right;
        }
        .right {
            text-align: left;
        }

        &.centered {
            position: relative;
            left: 13%;
        }
    }

    .center-horizontal {
        display: flex;
        justify-content: center;
    }

    .pointer {
        cursor: pointer;
    }

    .no-select {
        user-select: none !important;
    }

    .link {
        &:hover {
            text-decoration: underline;
        }
    }
    .no-underline {
        text-decoration: none !important;
        &:hover {
            text-decoration: none !important;
        }
    }

    .page-container {
        min-height: 65vh;
    }
    .align-bottom {
        display: flex;
        align-content: flex-end;
    }
`;

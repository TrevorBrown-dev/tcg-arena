import { css } from 'styled-components';

export const Mixins = css`
    @mixin background-parralax($h-alpha, $url) {
        background-image: linear-gradient(
                rgba($color-dark, $h-alpha),
                rgba($color-primary, $h-alpha)
            ),
            url($url);
        background-size: cover;

        //These three props make the parallax effect!
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
    }

    @mixin hover-animation-box($hover_dist: -0.3em, $active_dist: -0.1em) {
        transition: all 0.05s ease;
        cursor: pointer;
        &:hover {
            transform: translateY($hover_dist);
            box-shadow: 0 5px 10px -5px $color_dark;
        }

        &:active {
            transform: translateY($active_dist);
        }
    }
    @mixin hover-animation-text($hover_dist: -0.3em, $active_dist: -0.1em) {
        transition: all 0.05s ease;
        cursor: pointer;
        &:hover {
            transform: translateY($hover_dist);
            text-shadow: 0 5px 10px rgba($color_dark, 20%);
        }

        &:active {
            transform: translateY($active_dist);
            text-shadow: 0 2px 10px rgba($color_dark, 40%);
        }
    }
`;

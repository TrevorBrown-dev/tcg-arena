import type { NextPage } from 'next';
import styled from 'styled-components';
import { Button } from '../components/library/Button';
import { Form } from '../components/library/Form';
import { Input } from '../components/library/Input';
import { RegisterForm } from '../components/RegisterForm';
import {
    Crystal,
    genCrystal,
    generateRandomCrystals,
} from '../components/svg/Crystal';
import { JaggedFrame } from '../components/svg/JaggedFrame';
const StyledHome = styled.div`
    color: var(--color-light);
    background-color: var(--color-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        font-size: 9vw;
    }
    h2 {
        font-size: 3vw;
    }
    .hero {
        width: 100%;
        position: relative;
        padding: 5em;
        height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: transparent;
        justify-content: center;
        overflow: hidden;
        gap: 2em;
        *:not(.crystal) {
            z-index: 2;
        }
        .crystal {
            position: absolute;
            /* z-index: ; */
        }
    }
`;

const Home: NextPage = () => {
    return (
        <StyledHome>
            <div className="hero">
                {genCrystal(0, 20, 20, 30)}
                {genCrystal(2, 80, 20, -30)}
                {genCrystal(4, 20, 50, -30)}
                {genCrystal(5, 80, 50, 30)}

                <h1>TCG ARENA</h1>
                <h2>Sign up for some free goodies at launch!</h2>
                <RegisterForm />
                <JaggedFrame
                    style={{
                        position: 'absolute',
                        bottom: '-1',
                        left: 0,
                        width: '100vw',
                        height: 'auto',
                        zIndex: 1,
                    }}
                />
            </div>
            <div
                className="test"
                style={{
                    background: 'var(--color-off-secondary)',
                    width: '100%',
                    color: 'var(--color-dark)',
                }}
            >
                <h1>Hi there</h1>
            </div>
        </StyledHome>
    );
};

export default Home;

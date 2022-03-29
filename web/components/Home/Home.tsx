import type { NextPage } from 'next';
import styled from 'styled-components';
import { RegisterForm } from '../auth/RegisterForm';
import { genCrystal } from '../svg/Crystal';
import { JaggedFrame } from '../svg/JaggedFrame';
const StyledHome = styled.div`
    color: var(--color-light);
    background-color: var(--color-dark);
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

const Home: React.FC = () => {
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
                        bottom: '0',
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
                    minHeight: '10vh',
                    background: 'var(--color-off-secondary)',
                    width: '100%',
                    color: 'var(--color-dark)',
                }}
            >
                {/* <h1>Hi there</h1> */}
            </div>
        </StyledHome>
    );
};

export default Home;

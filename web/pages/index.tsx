import type { NextPage } from 'next';
import styled from 'styled-components';
const StyledHome = styled.div`
    color: var(--color-light);
    background-color: var(--color-secondary);
    height: 100vh;
    padding: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3em;

    h1 {
        font-size: 5em;
    }

    .button {
        border-radius: 20rem;
        background-color: var(--color-primary);
        color: var(--color-light);
        padding: 1em;
        font-size: 1.6rem;
        font-weight: bold;
    }
`;

const Input = styled.input`
    border-radius: 100px;
    outline: none;
    border: none;
    padding: 0.8em 0.8em;
    font-size: 1.6rem;

    &:focus {
        outline-offset: 2px;
        outline: 2px solid var(--color-light);
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    .row {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }
`;

const Home: NextPage = () => {
    return (
        <StyledHome>
            <h1>TCG Arena</h1>
            <Form>
                <div className="row">
                    <Input type="text" placeholder="email" />
                    <Input type="text" placeholder="password" />
                </div>
                <button className="button">Sign up now</button>
            </Form>
        </StyledHome>
    );
};

export default Home;

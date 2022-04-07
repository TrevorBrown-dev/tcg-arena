import { EventOfferType, useCreateEventMutation } from '@graphql-gen';
import { Button } from 'components/library/Button';
import { Input } from 'components/library/Input';
import { useState } from 'react';
import styled from 'styled-components';

const StyledPlay = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: var(--color-off-primary);
    gap: 1em;
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 400px;
        justify-content: center;
        align-items: center;
    }
`;

export const Play: React.FC = () => {
    const [code, setCode] = useState('');
    const [, createEvent] = useCreateEventMutation();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createEvent({
            recipientFriendCode: code,
            type: EventOfferType.Game,
        });

        setCode('');
    };
    return (
        <StyledPlay>
            <h1>Play</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder="Enter Friend Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <Button type="submit">Offer Game</Button>
            </form>
        </StyledPlay>
    );
};

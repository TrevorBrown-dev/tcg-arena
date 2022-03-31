import { useSendMessageMutation, useWatchChatSubscription } from '@graphql-gen';
import { Button } from 'components/library/Button';
import { Input } from 'components/library/Input';
import { useState } from 'react';
import styled from 'styled-components';
import { Stylable } from 'utils/types';

const StyledChatSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 50vh;
    .messages {
        overflow: auto;
    }
    .send-message {
        font-size: 0.7em;
        margin-top: 2em;
        display: flex;
        gap: 0.5em;
    }
`;

export const ChatSection: React.FC<{ lobbyId: string } & Stylable> = ({
    lobbyId,
    style,
}) => {
    const [chatResponse] = useWatchChatSubscription({
        pause: !lobbyId,
        variables: {
            lobbyId,
        },
    });
    const [, sendMessage] = useSendMessageMutation();
    const [message, setMessage] = useState('');

    const messages = chatResponse.data?.watchChat;
    return (
        <StyledChatSection style={style}>
            <div className="messages">
                {messages &&
                    messages.map((message) => {
                        return (
                            <div key={message.id}>
                                <strong>
                                    {message.account.userName}
                                    {': '}
                                </strong>
                                <span>{message.message}</span>
                            </div>
                        );
                    })}
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage({
                        lobbyId,
                        message,
                    });
                    setMessage('');
                }}
                className="send-message"
            >
                <Input
                    type="text"
                    style={{ width: '100%' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button type="submit">Send</Button>
            </form>
        </StyledChatSection>
    );
};

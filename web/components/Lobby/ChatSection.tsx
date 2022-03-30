import { useSendMessageMutation, useWatchChatSubscription } from '@graphql-gen';
import { Button } from 'components/library/Button';
import { Input } from 'components/library/Input';
import { useState } from 'react';
import styled from 'styled-components';
import { Stylable } from 'utils/types';

const StyledChatSection = styled.div``;

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
            <h2>Chat</h2>
            <div className="messages">
                {messages &&
                    messages.map((message) => {
                        return (
                            <div key={message.id}>
                                <h3>{message.account.userName}</h3>
                                <p>{message.message}</p>
                            </div>
                        );
                    })}
            </div>
            <div className="send-message">
                <Input
                    type="text"
                    style={{ width: '100%' }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button
                    onClick={() => {
                        sendMessage({
                            lobbyId,
                            message,
                        });
                        setMessage('');
                    }}
                >
                    Send
                </Button>
            </div>
        </StyledChatSection>
    );
};

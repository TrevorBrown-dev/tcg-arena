import { useMeQuery } from '@graphql-gen';
import { Stylable } from 'utils/types';

export type Participant = {
    id: number;
    userName: string;
    onClick?: () => void;
};

const ParticipantEntry: React.FC<Participant> = ({ id, userName, onClick }) => {
    const [me] = useMeQuery();

    const myId = me.data?.me?.id;
    return (
        <h3
            onClick={onClick}
            style={{
                color:
                    id === myId ? 'var(--color-primary)' : 'var(--color-light)',
            }}
        >
            {userName}
        </h3>
    );
};

export const Participants: React.FC<
    { participants: Participant[] } & Stylable
> = ({ participants, style }) => {
    const [me] = useMeQuery();
    const myId = me.data?.me?.id;
    const startGame = async () => {};
    return (
        <div style={style}>
            <h2>Participants</h2>
            <div>
                <ParticipantEntry
                    id={myId!}
                    userName={me.data?.me?.userName || ''}
                />
                {participants &&
                    participants
                        .filter((p) => p.id !== myId)
                        .map((participant) => {
                            return (
                                <ParticipantEntry
                                    onClick={startGame}
                                    key={participant.id}
                                    id={participant.id}
                                    userName={participant.userName}
                                />
                            );
                        })}
            </div>
        </div>
    );
};

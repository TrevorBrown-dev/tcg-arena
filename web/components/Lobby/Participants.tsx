import { Stylable } from 'utils/types';

export type Participant = {
    id: number;
    userName: string;
};

export const Participants: React.FC<
    { participants: Participant[] } & Stylable
> = ({ participants, style }) => {
    return (
        <div style={style}>
            <h2>Participants</h2>
            <div>
                {participants &&
                    participants.map((participant) => {
                        return (
                            <h3 key={participant.id}>{participant.userName}</h3>
                        );
                    })}
            </div>
        </div>
    );
};

import styled from 'styled-components';
import { Card, CardRecord } from '../../generated/graphql';

//TODO pull this out to a type later

export type CardRecordPart = {
    amount: number;
    card: {
        name: string;
        description: string;
        imageUrl?: string;
    };
};
type Props = {
    cardRecord: CardRecordPart;
};

const StyledCard = styled.div`
    width: 30rem;
    height: 40rem;
    border: 2px solid var(--color-dark);
    border-radius: 1rem;
    padding: 1em;
    .header {
        font-size: 1.5em;
        font-weight: bold;
    }

    .image {
        border-radius: 5px;
        border: 1px solid var(--color-medium);
        overflow: hidden;
        img {
            width: 100%;
        }
    }

    .description {
        padding: 1em;
        font-size: 1.2em;
    }
`;

export const CardLibraryCard: React.FC<Props> = ({ cardRecord }) => {
    const { card } = cardRecord;

    return (
        <StyledCard>
            <div className="header">{card.name}</div>
            <div className="image">
                <img src={'http://via.placeholder.com/640x360'} />
            </div>
            <div className="description">{card.description}</div>
            <div>x{cardRecord.amount}</div>
        </StyledCard>
    );
};

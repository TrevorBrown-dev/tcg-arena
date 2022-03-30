import styled from 'styled-components';
import {
    Card,
    CardRecord,
    useAddCardToDeckTemplateMutation,
} from '../../generated/graphql';
import { useModeContext } from '../Home/Dashboard';

//TODO pull this out to a type later

export type CardRecordPart = {
    amount: number;
    card: {
        id: number;
        name: string;
        description: string;
        imageUrl?: string;
    };
};
type Props = {
    cardRecord: CardRecordPart;
};

const StyledCard = styled.div`
    width: 15em;
    height: 20em;
    border: 2px solid var(--color-dark);
    border-radius: 1rem;
    padding: 1em;
    display: flex;
    flex-direction: column;
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
        font-size: 1em;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 0.5rem;
            background-color: var(--color-medium);
        }
        ::-webkit-scrollbar-thumb {
            width: 0.5rem;
            background: #fff;
            border: 1px solid var(--color-dark);
            border-radius: 0.5rem;
        }
    }
    .amount {
        display: flex;
        height: 100%;
        flex: 1;
        justify-content: flex-end;
        align-items: flex-end;
        .amount-container {
            font-weight: 400;
        }
    }
`;

export const CardLibraryCard: React.FC<Props> = ({ cardRecord }) => {
    const { card } = cardRecord;
    const { mode } = useModeContext();
    const [, addCard] = useAddCardToDeckTemplateMutation();

    return (
        <StyledCard
            onClick={() => {
                if (mode.mode === 'edit' && mode.targetDeckId) {
                    addCard({
                        cardId: card.id,
                        deckTemplateId: mode.targetDeckId,
                    });
                }
            }}
        >
            <div className="header">{card.name}</div>
            <div className="image">
                <img src={'http://via.placeholder.com/640x360'} />
            </div>
            <div className="description">{card.description}</div>
            <div className="amount">
                <div className="amount-container">x{cardRecord.amount}</div>
            </div>
        </StyledCard>
    );
};

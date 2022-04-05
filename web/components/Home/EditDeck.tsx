import { useCardPreviewContext } from 'components/Card/CardPreview';
import { CardRecordPart, WithCardRecord } from 'components/Card/types';
import styled from 'styled-components';
import {
    useDeleteDeckTemplateMutation,
    useRemoveCardFromDeckTemplateMutation,
    useWatchDeckTemplateSubscription,
} from '../../generated/graphql';
import { Button } from '../library/Button';
import { useModeContext } from './Dashboard';
import { DeckSidebar } from './MyDecks';

const EditDeckContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top-half {
        flex: 1;
    }
    .bottom-half {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2em;
    }
    .delete {
        transition: all 0.2s ease-in-out;
        color: var(--color-medium);
        &:hover {
            color: var(--color-warning);
            cursor: pointer;
        }
    }
`;

const StyledCardEntry = styled.div`
    user-select: none;
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        gap: 0.8ch;
    }
    strong {
        display: block;
        transition: all 0.1s ease-in-out;
        cursor: zoom-in;
        &:hover {
            transform: scale(1.05);
        }
    }
`;

const CardEntry: React.FC<WithCardRecord> = ({ cardRecord }) => {
    const { onMouseEnter, onMouseLeave } = useCardPreviewContext();
    const [, removeCard] = useRemoveCardFromDeckTemplateMutation();
    const { mode } = useModeContext();

    return (
        <StyledCardEntry>
            <div className="left">
                <strong
                    onMouseEnter={() =>
                        onMouseEnter(cardRecord as CardRecordPart)
                    }
                    onMouseLeave={onMouseLeave}
                >
                    {cardRecord.card.name}
                </strong>
                <span>{'-'}</span>
                <span>{cardRecord.amount}</span>
            </div>
            <div className="right">
                <span
                    className="material-icons-outlined delete"
                    onClick={() => {
                        removeCard({
                            cardId: cardRecord.card.id,
                            id: mode.targetDeckId!,
                            isFoil: cardRecord.isFoil,
                        });
                    }}
                >
                    delete
                </span>
            </div>
        </StyledCardEntry>
    );
};

export const EditDeck: React.FC = () => {
    const { mode, setMode } = useModeContext();
    const [deckResponse] = useWatchDeckTemplateSubscription({
        pause: mode.mode !== 'edit' || !mode.targetDeckId,
        variables: {
            deckTemplateId: mode.targetDeckId!,
        },
    });
    const [, deleteDeck] = useDeleteDeckTemplateMutation();

    const handleDeleteDeck = async () => {
        if (!mode.targetDeckId) return;
        await deleteDeck({ id: mode.targetDeckId });
        setMode({ mode: 'view' });
    };

    const deck = deckResponse.data?.deckTemplateUpdated;
    return (
        <DeckSidebar>
            <EditDeckContainer>
                <div className="top-half">
                    <h1>{deck?.name}</h1>
                    <div className="cards">
                        {deck?.cards.map((card, i) => (
                            <CardEntry
                                key={i}
                                cardRecord={card as CardRecordPart}
                            />
                        ))}
                    </div>
                </div>
                <div className="bottom-half">
                    <Button
                        onClick={() => {
                            setMode({
                                mode: 'view',
                            });
                        }}
                    >
                        Back
                    </Button>
                    <Button className="warning" onClick={handleDeleteDeck}>
                        Delete Deck
                    </Button>
                </div>
            </EditDeckContainer>
        </DeckSidebar>
    );
};

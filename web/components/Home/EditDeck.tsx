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
    }
`;

export const EditDeck: React.FC = () => {
    const { mode, setMode } = useModeContext();
    const [deckResponse] = useWatchDeckTemplateSubscription({
        pause: mode.mode !== 'edit' || !mode.targetDeckId,
        variables: {
            deckTemplateId: mode.targetDeckId!,
        },
    });
    const [, deleteDeck] = useDeleteDeckTemplateMutation();

    const [, removeCard] = useRemoveCardFromDeckTemplateMutation();

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
                            <div
                                key={i}
                                onClick={() => {
                                    removeCard({
                                        cardId: card.card.id,
                                        id: deck.id,
                                    });
                                }}
                            >
                                {card.card.name} - {card.amount}
                            </div>
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
                        Delete
                    </Button>
                </div>
            </EditDeckContainer>
        </DeckSidebar>
    );
};

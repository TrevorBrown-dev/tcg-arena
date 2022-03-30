import {
    useRemoveCardFromDeckTemplateMutation,
    useWatchDeckTemplateSubscription,
} from '../../generated/graphql';
import { useModeContext } from './Dashboard';
import { DeckSidebar } from './MyDecks';

export const EditDeck: React.FC = () => {
    const { mode } = useModeContext();
    const [deckResponse] = useWatchDeckTemplateSubscription({
        pause: mode.mode !== 'edit' || !mode.targetDeckId,
        variables: {
            deckTemplateId: mode.targetDeckId!,
        },
    });

    const [, removeCard] = useRemoveCardFromDeckTemplateMutation();

    const deck = deckResponse.data?.deckTemplateUpdated;
    return (
        <DeckSidebar>
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
        </DeckSidebar>
    );
};

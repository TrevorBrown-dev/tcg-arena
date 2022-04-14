import { AdminCardsDocument, Card, useUpdateCardMutation } from '@graphql-gen';
import { Button } from 'components/library/Button';
import { FormEventHandler, useEffect, useState } from 'react';
import { useCardContext } from './SelectedCardContext';

export const EditCard: React.FC = () => {
    const { card, setCard } = useCardContext();
    const [selectedCard, setSelectedCard] = useState<Card>(card!);
    const [, updateCard] = useUpdateCardMutation();
    useEffect(() => {
        setSelectedCard(card!);
    }, [card]);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const { id, metadata, ...card } = selectedCard;
        await updateCard({
            updateCardId: id,
            data: {
                ...card,
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>{selectedCard?.name}</h1>
                <textarea
                    value={selectedCard?.code}
                    onChange={(e) =>
                        setSelectedCard({
                            ...selectedCard,
                            code: e.target.value || '',
                        })
                    }
                ></textarea>
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

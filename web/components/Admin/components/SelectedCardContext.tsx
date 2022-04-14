import { Card } from '@graphql-gen';
import { createContext, useContext, useState } from 'react';

type CardContext = {
    card: Card | null;
    setCard: (card: Card) => void;
};

const cardContext = createContext<CardContext>({
    card: null,
    setCard: () => {},
});

export const useCardContext = () => useContext(cardContext);

export const CardContextLayout: React.FC = ({ children }) => {
    const [card, setCard] = useState<Card | null>(null);
    return (
        <cardContext.Provider value={{ card, setCard }}>
            {children}
        </cardContext.Provider>
    );
};

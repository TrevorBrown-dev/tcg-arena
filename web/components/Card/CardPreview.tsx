import { createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { CardRecordPart, WithCardObj, WithCardRecord } from './types';
const StyledCardPreview = styled.div`
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    animation: fadeIn 0.2s forwards;
    .preview {
        box-shadow: 0 0 0.5em 0.1em var(--color-dark);
        font-size: 1.5em;
    }
`;
export const CardPreview: React.FC = () => {
    const { cardPreview } = useCardPreviewContext();
    return (
        <StyledCardPreview>
            <Card cardRecord={cardPreview!} className="preview" />
        </StyledCardPreview>
    );
};

const cardPreviewContext = createContext<{
    cardPreview: CardRecordPart | null;
    setCardPreview: (cardPreview: CardRecordPart | null) => void;
    onMouseEnter: (cardPreview: CardRecordPart) => void;
    onMouseLeave: () => void;
    clear: () => void;
}>({
    cardPreview: null,
    setCardPreview: () => {},
    onMouseEnter: (cardPreview: CardRecordPart) => {},
    onMouseLeave: () => {},
    clear: () => {},
});
export const useCardPreviewContext = () => useContext(cardPreviewContext);

export const CardPreviewContextLayout: React.FC = ({ children }) => {
    const [cardPreview, setCardPreview] = useState<CardRecordPart | null>(null);
    const [previewTimeout, setPreviewTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    const clear = () => {
        if (previewTimeout) {
            clearTimeout(previewTimeout);
            setPreviewTimeout(null);
        }
        setCardPreview(null);
    };

    const reset = (cardPreview: CardRecordPart) => {
        if (previewTimeout) {
            clearTimeout(previewTimeout);
        }
        setPreviewTimeout(
            setTimeout(() => {
                setCardPreview(cardPreview);
            }, 500)
        );
    };

    useEffect(() => {
        console.log(cardPreview);
    }, [cardPreview]);
    return (
        <cardPreviewContext.Provider
            value={{
                cardPreview,
                setCardPreview,
                onMouseEnter: (cardPreview) => {
                    reset(cardPreview);
                },
                onMouseLeave: () => {
                    clear();
                },
                clear,
            }}
        >
            {cardPreview && <CardPreview />}
            {children}
        </cardPreviewContext.Provider>
    );
};

import {
    useMeQuery,
    useMyDeckTemplatesSubscription,
    useSelectDeckMutation,
} from '@graphql-gen';
import { useState } from 'react';
import styled from 'styled-components';
import { useLobbyContext } from '../GameOrPreGame';

const StyledSelectDeck = styled.aside`
    height: 100%;
    background-color: var(--color-secondary);
    color: var(--color-light);
    padding: 2em;

    .decks {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
`;

const DeckEntry = styled.div<{ selected: boolean }>`
    cursor: pointer;
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
`;

export const SelectMyDeck: React.FC = () => {
    const [selectDeckResponse, selectDeck] = useSelectDeckMutation();
    const [deckTemplatesResponse] = useMyDeckTemplatesSubscription();
    const lobby = useLobbyContext();
    const [selectedDeck, setSelectedDeck] = useState<number | null>(null);

    const deckTemplates = deckTemplatesResponse?.data?.myDeckTemplates;
    return (
        <StyledSelectDeck>
            <div className="decks">
                {deckTemplates?.map((deckTemplate, i) => (
                    <DeckEntry
                        selected={deckTemplate.id === selectedDeck}
                        key={i}
                        onClick={() => {
                            setSelectedDeck(deckTemplate.id);
                            selectDeck({
                                deckTemplateId: deckTemplate.id,
                                preGameLobbyId: lobby.id,
                            });
                        }}
                    >
                        {deckTemplate.name}
                    </DeckEntry>
                ))}
            </div>
        </StyledSelectDeck>
    );
};

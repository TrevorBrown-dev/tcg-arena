import { useState } from 'react';
import styled from 'styled-components';
import {
    useCreateDeckTemplateMutation,
    useDeleteDeckTemplateMutation,
    useMyDeckTemplatesSubscription,
} from '../../generated/graphql';
import { Button } from '../library/Button';
import { Input } from '../library/Input';
import { useModeContext } from './Dashboard';

export const DeckSidebar = styled.div`
    background-color: var(--color-secondary);
    color: var(--color-light);
    min-height: 100vh;
    padding: 1em;
    width: 21em;
    .controls {
        font-size: 0.5em;
        display: flex;
        justify-content: center;
        gap: 6px;
    }
    .decks {
        display: flex;
        flex-direction: column;
        padding: 1em;
        font-size: 1.3em;
        font-weight: 400;
        /* gap: 1em; */
    }
`;

const DeckTemplateControls: React.FC = () => {
    const [, createDeckTemplate] = useCreateDeckTemplateMutation();
    const [name, setName] = useState('');
    return (
        <div className="controls">
            <Input
                type="text"
                placeholder="New Deck"
                value={name}
                onChange={(e) => setName(e.target.value || '')}
            />
            <Button
                disabled={!name}
                onClick={async () => {
                    if (!name) return;
                    await createDeckTemplate({ name });
                    setName('');
                }}
            >
                Create Deck
            </Button>
        </div>
    );
};

const StyledDeckListItem = styled.div`
    cursor: pointer;
`;

const DeckListItem: React.FC<{ name: string; id: number }> = ({ name, id }) => {
    const { setMode } = useModeContext();
    return (
        <StyledDeckListItem
            onClick={() => {
                setMode({ mode: 'edit', targetDeckId: id });
            }}
        >
            {name}
        </StyledDeckListItem>
    );
};

export const MyDecks: React.FC = () => {
    const [deckTemplates] = useMyDeckTemplatesSubscription();
    return (
        <DeckSidebar>
            <DeckTemplateControls />
            <div className="decks">
                {deckTemplates.data?.myDeckTemplates.map((deckTemplate, i) => {
                    return (
                        <DeckListItem
                            key={i}
                            name={deckTemplate.name}
                            id={deckTemplate.id}
                        />
                    );
                })}
            </div>
        </DeckSidebar>
    );
};

import { EditDeck } from './EditDeck';
import { MyCardLibrary } from './MyCardLibrary';
import { DeckSidebar } from './MyDecks';
import { StytledMode } from './ViewMode';

export const EditMode = () => {
    return (
        <StytledMode>
            <MyCardLibrary />
            <EditDeck />
        </StytledMode>
    );
};

import {
    useCreateDeckTemplateMutation,
    useDeleteDeckTemplateMutation,
    useMyDeckTemplatesSubscription,
} from '../../generated/graphql';
import { Button } from '../library/Button';

export const MyDecks: React.FC = () => {
    const [, createDeckTemplate] = useCreateDeckTemplateMutation();
    const [deckTemplates] = useMyDeckTemplatesSubscription();
    const [, deleteDeckTemplate] = useDeleteDeckTemplateMutation();
    console.log(deckTemplates);
    return (
        <div>
            {deckTemplates.data?.myDeckTemplates.map((deckTemplate, i) => {
                return (
                    <div
                        key={i}
                        onClick={async () => {
                            await deleteDeckTemplate({
                                id: deckTemplate.id,
                            });
                        }}
                    >
                        {deckTemplate.name}
                    </div>
                );
            })}
            <Button
                onClick={() =>
                    createDeckTemplate({ name: 'My first deck template' })
                }
            >
                Create Deck Template
            </Button>
        </div>
    );
};

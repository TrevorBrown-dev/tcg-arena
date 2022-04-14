import { CardGallery } from './components/CardGallery';
import { EditCard } from './components/EditCard';
import { CardContextLayout } from './components/SelectedCardContext';

export const Admin: React.FC = () => {
    return (
        <CardContextLayout>
            <div>
                <CardGallery />
                <EditCard />
            </div>
        </CardContextLayout>
    );
};

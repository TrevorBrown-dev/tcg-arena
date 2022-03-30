import { Logout } from '../auth/Logout';
import { SidebarNavLayout } from '../layout/SidebarNavLayout';
import { MyCardLibrary } from './MyCardLibrary';
import { ViewMode } from './ViewMode';

export const Dashboard: React.FC = () => {
    return (
        <SidebarNavLayout>
            <ViewMode />
        </SidebarNavLayout>
    );
};

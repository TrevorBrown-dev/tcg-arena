import { SidebarNav } from '../Navbar/SidebarNav';
import { SidebarLayout } from './SidebarLayout';

export const SidebarNavLayout: React.FC = ({ children }) => (
    <SidebarLayout sidebar={<SidebarNav />}>{children}</SidebarLayout>
);

import { Logout } from '../auth/Logout';

export const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>This is the dashboard page.</p>
            <Logout />
        </div>
    );
};

import { useRouter } from 'next/router';
import { useLogoutMutation } from '../../generated/graphql';
import { Button } from '../library/Button';

export const Logout: React.FC = () => {
    const [, logout] = useLogoutMutation();
    const handleLogout = async () => {
        const res = await logout();
        if (res.data?.logout) {
            window.location.href = '/';
        }
    };
    return <Button onClick={handleLogout}>Logout</Button>;
};

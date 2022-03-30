import { NextPage } from 'next';
import { useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Loading } from '../components/Loading';
import { useLogoutMutation } from '../generated/graphql';

const Logout: NextPage = () => {
    const [, logout] = useLogoutMutation();
    const handleLogout = async () => {
        const res = await logout();
        if (res.data?.logout) {
            window.location.href = '/';
        }
    };
    useEffect(() => {
        handleLogout();
    });
    return <Layout>Logging you out...</Layout>;
};
export default Logout;

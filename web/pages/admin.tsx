import { useMeAdminQuery, useMeQuery } from '@graphql-gen';
import { Admin } from 'components/Admin/Admin';
import { Layout } from 'components/layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export const AdminPage: NextPage = () => {
    const [me] = useMeAdminQuery();
    const router = useRouter();
    useEffect(() => {
        if (me.error) {
            router.push('/');
        }
    }, [me]);
    if (me.fetching || me.error) return <></>;
    return (
        <Layout>
            <Admin />
        </Layout>
    );
};
export default AdminPage;

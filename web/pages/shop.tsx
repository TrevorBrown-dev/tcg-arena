import { NextPage } from 'next';
import { Layout } from '../components/layout/Layout';
import { Shop } from '../components/Shop/Shop';

const ShopPage: NextPage = () => {
    return (
        <Layout>
            <Shop />
        </Layout>
    );
};

export default ShopPage;

import { NextPage } from 'next';
import { Dashboard } from '../components/Home/Dashboard';
import Home from '../components/Home/Home';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/library/Button';
import { Loading } from '../components/Loading';
import { useMeQuery } from '../generated/graphql';

const Index: NextPage = () => {
    const [me] = useMeQuery();
    if (me.fetching) return <Loading />;
    return <Layout>{me.data?.me ? <Dashboard /> : <Home />}</Layout>;
};

export default Index;

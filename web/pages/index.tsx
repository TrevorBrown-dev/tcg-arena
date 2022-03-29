import { NextPage } from 'next';
import { Dashboard } from '../components/Home/Dashboard';
import Home from '../components/Home/Home';
import { Loading } from '../components/Loading';
import { useMeQuery } from '../generated/graphql';

const Index: NextPage = () => {
    const [me] = useMeQuery();
    console.log(me);
    if (me.fetching) return <Loading />;
    return me.data?.me ? <Dashboard /> : <Home />;
};

export default Index;

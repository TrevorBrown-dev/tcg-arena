import { useMeQuery, useWatchLobbySubscription } from '@graphql-gen';
import { Layout } from 'components/layout/Layout';
import { Lobby } from 'components/Lobby/Lobby';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export const ActiveLobby: NextPage = () => {
    const router = useRouter();
    const { lobbyId } = router.query;

    if (!lobbyId) {
        return <div>No lobbyId</div>;
    }
    return (
        <Layout>
            <Lobby lobbyId={lobbyId as string} />
        </Layout>
    );
};
export default ActiveLobby;

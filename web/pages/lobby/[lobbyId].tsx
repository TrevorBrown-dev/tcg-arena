import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
    useLeaveLobbyMutation,
    useMeQuery,
    useWatchLobbySubscription,
} from '../../generated/graphql';
export const ActiveLobby: NextPage = () => {
    const router = useRouter();
    const [me] = useMeQuery();
    const [lobby] = useWatchLobbySubscription({
        pause: !me.data?.me,
        variables: {
            watchLobbyId: router!.query!.lobbyId! as string,
            accountId: me.data?.me?.id!,
        },
    });

    useEffect(() => {
        console.log(lobby);
    }, [lobby]);

    return (
        <div>
            <h1>Active Lobby</h1>
            <h2>{router.query.lobbyId}</h2>
            {lobby.data?.watchLobby.members.map((mem) => {
                return <h3 key={mem.id}>{mem.userName}</h3>;
            })}
        </div>
    );
};
export default ActiveLobby;

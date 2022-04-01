import { GameOrPreGame } from 'components/Game/GameOrPreGame';
import { Layout } from 'components/layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
const Game: NextPage = () => {
    const router = useRouter();
    const gameId = router.query.gameId as string;

    return (
        <Layout>
            <GameOrPreGame lobbyId={gameId} />
        </Layout>
    );
};
export default Game;

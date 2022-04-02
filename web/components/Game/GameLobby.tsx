import { Loading } from 'components/Loading';
import { useLobbyContext } from './utils/lobbyContext';
import { useGame } from './utils/useGame/useGame';

export const GameLobby: React.FC = () => {
    const game = useGame();
    if (!game || !game.lobby || !game.privateGame || !game.publicGame) {
        return <Loading />;
    }
    console.log(game);
    return (
        <div>
            {game.privateGame.players[0].hand.cards?.map((card) => (
                <div>
                    <h1>{card.name}</h1>
                    <p>{card.description}</p>
                </div>
            ))}
        </div>
    );
};

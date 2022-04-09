import { InterpreterAction } from './InterpreterAction';

export const attack: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    const { actingPlayer, otherPlayer } =
        game.getActingAndOtherPlayer(playerId);
    if (!cardId) {
        throw new Error('No card id found');
    }
    const [targetUuid, amount] = token.values;

    const target = game.targets.find((t) => t.uuid === targetUuid);

    target?.damage(parseInt(amount));

    actingPlayer.playField.transferCards([cardId], actingPlayer.graveyard);
};

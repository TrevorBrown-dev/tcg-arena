import { InterpreterAction } from './InterpreterAction';

export const attack: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    if (!cardId) {
        throw new Error('No card id found');
    }
    const [targetUuid, amount] = token.values;

    const target = game.targets.find((t) => t.uuid === targetUuid);
    if (!target) {
        throw new Error('Target not found in attack action');
    }
    target.damage(parseInt(amount));
    game.emitEvent('ATTACK', cardId, playerId);
};

import { InterpreterAction } from './InterpreterAction';

export const heal: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    const [target, amount] = token.values;
    const toHeal = game.targets.find((t) => t.uuid === target);
    if (!toHeal) {
        throw new Error(`Target ${target} not found in heal action`);
    }
    toHeal.heal(parseInt(amount), game);
    game.emitEvent('HEAL', cardId, playerId);
};

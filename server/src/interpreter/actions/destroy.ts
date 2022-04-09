import { InterpreterAction } from './InterpreterAction';

export const destroy: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    const [attackTarget, dmg] = token.values;
    const dmgAmount = parseInt(dmg);
    const damageTarget = game.targets.find((t) => t.uuid === attackTarget);
    if (!damageTarget) {
        throw new Error('Invalid target');
    }
    damageTarget.damage(dmgAmount);
};

import { InterpreterAction } from './InterpreterAction';

export const tap: InterpreterAction = (code, token, game, playerId, cardId) => {
    const [target, _amount] = token.values;
    const amount = parseInt(_amount);
    if (!target || !amount)
        throw new Error('Missing parameters in draw action');
    const playerToDraw = game.getPlayer(target);
    console.log(code, token.values);
    if (!playerToDraw) throw new Error('Player not found in draw action');
    playerToDraw.drawCards(amount);
    game.emitEvent('TAP', cardId, playerId);
    game.emitEvent(`TAP_${playerId}`, cardId, playerId);
};

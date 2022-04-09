import { InterpreterAction } from './InterpreterAction';

export const draw: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    const { actingPlayer, otherPlayer } =
        game.getActingAndOtherPlayer(playerId);
    const [target, _amount] = token.values;
    let playerWhoDrew: string = '';
    const amount = parseInt(_amount);
    if (target === 'SELF') {
        actingPlayer.drawCards(amount);
    } else if (target === 'OTHER') {
        otherPlayer.drawCards(amount);
    } else {
        throw new Error('Invalid target');
    }
};

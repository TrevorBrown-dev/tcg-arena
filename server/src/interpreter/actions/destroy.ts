import { InterpreterAction } from './InterpreterAction';

export const destroy: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    //! Needs rework later to handle discards but maybe thats a different action entirely
    const { actingPlayer, otherPlayer } =
        game.getActingAndOtherPlayer(playerId);
    const inActing = !!actingPlayer.playField.findCard(cardId);
    const inOther = !!otherPlayer.playField.findCard(cardId);
    console.log('RUNNING DESTROY');
    if (!inActing && !inOther) {
        throw new Error('Card not found in destroy action');
    }
    if (inActing) {
        actingPlayer.playField.transferCards([cardId], actingPlayer.graveyard);
    }
    if (inOther) {
        otherPlayer.playField.transferCards([cardId], otherPlayer.graveyard);
    }
    game.emitEvent('DESTROY', cardId, playerId);
};

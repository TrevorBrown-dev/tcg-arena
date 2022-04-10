import { Game } from '../../game/Game';
import { ParsedCode, VERBS } from '../Interpreter';
import { InterpreterAction } from './InterpreterAction';

export const when: InterpreterAction = (
    code,
    token,
    game,
    playerId,
    cardId
) => {
    const [verb, ...action] = token.values;
    console.log('TOKEN IN WHEN FUNC', token);
    const card = game.targets.find((t) => t.uuid === cardId);
    const newAction: ParsedCode = {
        HEADER: {},
        BODY: `${action.join(' ')};`,
    };
    console.log('ACTION', action);
    game.regesterEvent(verb, (cardPlayed, playedBy) => {
        game.executeAction(playerId, newAction, cardId);
        game.emitEvent('WHEN', cardId, playerId);
        game.logs.push(`${card?.name} triggered an action`);
        Game.publishGame(game);
    });
};

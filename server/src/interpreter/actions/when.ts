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
    if (!verb || !Object.values(VERBS).includes(verb as VERBS))
        throw new Error('No verb found in when action');
    const card = game.targets.find((t) => t.uuid === cardId);
    const newAction: ParsedCode = {
        HEADER: {},
        BODY: action.join(' '),
    };
    game.regesterEvent(verb, () => {
        game.executeAction(playerId, newAction, cardId);
        game.emitEvent('WHEN');
        game.logs.push(`${card?.name} triggered an action`);
        Game.publishGame(game);
    });
};

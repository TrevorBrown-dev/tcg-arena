import { Game } from '../../game/Game';
import { Player } from '../../game/Player/Player';
import { ParsedCode, Token } from '../Interpreter';

export type InterpreterAction = (
    code: ParsedCode,
    token: Token,
    game: Game,
    playerId: string,
    cardId: string
) => void;

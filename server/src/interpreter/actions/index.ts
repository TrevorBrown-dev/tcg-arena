import { attack } from './attack';
import { destroy } from './destroy';
import { draw } from './draw';
import { InterpreterAction } from './InterpreterAction';
import { tap } from './tap';
import { when } from './when';

export const ActionMap: {
    [key: string]: InterpreterAction;
} = {
    ['DRAW']: draw,
    ['ATTACK']: attack,
    ['DESTROY']: destroy,
    ['WHEN']: when,
    ['TAP']: tap,
};

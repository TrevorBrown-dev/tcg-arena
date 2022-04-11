import { attack } from './attack';
import { destroy } from './destroy';
import { draw } from './draw';
import { InterpreterAction } from './InterpreterAction';
import { tap } from './tap';
import { when } from './when';

export const ActionMap: {
    [key: string]: InterpreterAction;
} = {
    ['DRAW']: draw, //A regular draw action
    ['TAP']: tap, //Drawing without triggering a draw event
    ['ATTACK']: attack, //A damage dealing action
    ['DESTROY']: destroy, //Moves the card to the graveyard
    ['WHEN']: when, //An action that triggers when a condition is met
};

import { nanoid } from 'nanoid';
import { Player } from './Player';
import { WithId } from './utils/WithId';

//create a class decorator that will inject a property called id
export class Game extends WithId {
    constructor(private player1: Player, private player2: Player) {
        super();
    }
}

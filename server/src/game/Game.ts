import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';
import { WithId } from './utils/WithId';

//create a class decorator that will inject a property called id

@ObjectType()
export class Game {
    @Field(() => String)
    id: string = nanoid();

    @Field(() => Player)
    get player1() {
        return this._player1;
    }

    @Field(() => Player)
    get player2() {
        return this._player2;
    }

    @Field(() => String)

    constructor(private _player1: Player, private _player2: Player) {}
}

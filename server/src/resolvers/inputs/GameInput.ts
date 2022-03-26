import { Field, InputType } from 'type-graphql';

@InputType()
export class GameInput {
    @Field()
    player1Health: number;

    @Field()
    player2Health: number;
}

import { Field, InputType } from 'type-graphql';
import { Game } from '../../entities/Game';

@InputType()
export class GameInput {
    @Field()
    player1Id: number;

    @Field()
    player2Id: number;

    @Field()
    p1DeckTemplateId: number;

    @Field()
    p2DeckTemplateId: number;
}

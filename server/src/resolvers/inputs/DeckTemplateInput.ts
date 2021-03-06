import { Field, InputType } from 'type-graphql';

@InputType()
export class DeckTemplateInput {
    @Field()
    name: string;

    @Field(() => Number, { nullable: true })
    cardLibraryId: number;
}

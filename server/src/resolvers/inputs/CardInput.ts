import { Field, InputType } from 'type-graphql';

@InputType()
export class CardInput {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    imageUrl: string;

    @Field()
    code: string;
}

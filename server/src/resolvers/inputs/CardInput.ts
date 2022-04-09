import { Field, InputType } from 'type-graphql';

@InputType()
export class CardInput {
    @Field()
    id: number;
    @Field()
    name: string;

    @Field()
    description: string;

    @Field({ nullable: true })
    imageUrl: string;

    @Field()
    code: string;
}

@InputType()
export class UpdateCardInput {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    imageUrl: string;

    @Field({ nullable: true })
    code: string;
}

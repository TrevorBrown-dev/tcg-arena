import {
    Arg,
    Field,
    ObjectType,
    Query,
    Resolver,
    Root,
    Subscription,
} from 'type-graphql';
import { pubsub } from '..';
import { Account } from '../entities/Account';
@ObjectType()
class Test {
    @Field(() => String, { nullable: true })
    message: string;
}
type Iterator<T> = AsyncIterator<T> & T;
@Resolver(Account)
class AccountResolver {
    @Query(() => Test)
    async accounts(): Promise<Test> {
        pubsub.publish('account_secret', { message: 'hi there fucker' });
        return { message: 'hi there' };
    }

    @Subscription(() => Test, {
        topics: ({ args }) => {
            console.log('args', args);
            return `account_${args.testing}`;
        },
    })
    async accountAdded(
        @Root() params: Iterator<Test>,
        @Arg('testing') testing: string
    ): Promise<Test> {
        console.log(params);
        console.log(testing);

        return {
            ...params,
        };
    }
}

export default AccountResolver;

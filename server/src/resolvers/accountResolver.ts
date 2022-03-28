import {
    Arg,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { Account } from '../entities/Account';
import { RegisterInput } from './inputs/registerInput';
import argon2 from 'argon2';

@ObjectType()
class FieldError {
    @Field()
    field?: string;

    @Field()
    message?: string;
}

@ObjectType()
class AccountResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Account, { nullable: true })
    account?: Account;
}
type Iterator<T> = AsyncIterator<T> & T;
@Resolver(Account)
class AccountResolver {
    @Query(() => Account)
    async account(@Arg('id') id: number): Promise<Account> {
        const account = await Account.findOne({
            relations: ['cardLibrary'],
            where: { id },
        });
        console.log(account);
        if (!account) throw new Error(`Account not found with id: ${id}`);

        return account;
    }

    @Mutation(() => AccountResponse)
    async register(
        @Arg('input') input: RegisterInput
    ): Promise<AccountResponse> {
        const { email, password, userName } = input;
        const hashedPassword = await argon2.hash(password);
        try {
            const account = await Account.create({
                email,
                password: hashedPassword,
                userName,
            }).save();

            Account.createDefaultCardLibrary(account);

            return { account };
        } catch (err: any) {
            console.log(err);
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'email',
                            message: 'Email is already in use.',
                        },
                    ],
                };
            } else {
                console.log(err);
                return {
                    errors: [
                        {
                            field: 'Other error',
                            message: err.toString(),
                        },
                    ],
                };
            }
        }
    }
}

//    @Subscription(() => Test, {
//     topics: ({ args }) => {
//         console.log('args', args);
//         return `account_${args.testing}`;
//     },
// })
// async accountAdded(
//     @Root() params: Iterator<Test>,
//     @Arg('testing') testing: string
// ): Promise<Test> {
//     console.log(params);
//     console.log(testing);

//     return {
//         ...params,
//     };
// }
export default AccountResolver;

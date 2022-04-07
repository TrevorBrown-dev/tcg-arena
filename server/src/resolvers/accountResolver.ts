import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import { Account } from '../entities/Account';
import { RegisterInput } from './inputs/registerInput';
import argon2 from 'argon2';
import { MyContext } from '../types';
import { ILike } from 'typeorm';
import jwt from 'jsonwebtoken';
import { parseJWT } from '../utils/parseJWT';
import { nanoid } from 'nanoid';
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
                friendCode: nanoid(),
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
    @Mutation(() => AccountResponse)
    async login(
        @Ctx() { req: { res } }: MyContext,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<AccountResponse> {
        const account = await Account.findOne({
            where: { email: ILike(email) },
        });

        if (!account) {
            return {
                errors: [
                    {
                        field: 'usernameOrEmail',
                        message: 'That username does not exist.',
                    },
                ],
            };
        }

        const valid = await argon2.verify(account.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Incorrect password.',
                    },
                ],
            };
        }

        //Place for jwt
        // send jwt back as cookie
        const token = jwt.sign(
            { id: account.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        return {
            account,
        };
    }
    @Mutation(() => Boolean)
    logout(@Ctx() { req: { res } }: MyContext): boolean {
        try {
            res.clearCookie('token');
            return true;
        } catch (err) {
            console.log('ERROR CLEARING COOKIE', err);
            return false;
        }
    }
    @Query(() => Account, { nullable: true })
    async me(@Ctx() { req: { req } }: MyContext): Promise<Account> {
        const authorization = req.headers.cookie;
        if (!authorization) throw new Error(`Authorization Failed`);

        const payload = await parseJWT(authorization);
        const { id } = payload;
        const account = await Account.findOne({
            where: { id },
            relations: ['cardLibrary'],
        });

        if (!account) throw new Error(`Account not found with id: ${id}`);

        return account;
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

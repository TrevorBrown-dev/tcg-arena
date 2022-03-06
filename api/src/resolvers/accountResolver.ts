import { Query, Resolver } from 'type-graphql';
import { Account } from '../entities/Account';
@Resolver(Account)
export class AccountResolver {
    @Query(() => [Account])
    async accounts() {
        return await Account.find();
    }
}

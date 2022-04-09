import { AuthChecker } from 'type-graphql';
import { Account } from '../../entities/Account';
import { MyContext } from '../../types';
import { getAccountFromCookie } from './getAccountFromCookie';

export const customAuthChecker: AuthChecker<MyContext> = async ({
    context: { accountId },
}) => {
    if (!accountId) {
        return false;
    }
    const account = await Account.findOne({
        where: {
            id: accountId,
        },
    });
    if (!account) {
        return false;
    }

    return account.isAdmin;
};

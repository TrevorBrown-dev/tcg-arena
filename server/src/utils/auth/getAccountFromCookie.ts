import { Account } from '../../entities/Account';
import { parseJWT } from '../parseJWT';

export const getAccountIdFromCookie = (cookies: string | undefined) => {
    const authorization = cookies;
    if (!authorization) return null;
    const account = parseJWT(authorization!);
    if (!account || !account?.id) return null;
    return parseInt(account.id);
};
export const getAccountFromCookie = async (cookies: string) => {
    const id = await getAccountIdFromCookie(cookies);
    if (!id) return null;
    return await Account.findOne({
        where: { id },
        relations: ['cardLibrary'],
    });
};

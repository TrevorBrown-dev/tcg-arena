import jwt from 'jsonwebtoken';

export const parseJWT = (
    cookies: string,
    identifier: string = 'token'
): { id: string } => {
    //find the authorization cookie
    const authorization = cookies
        .split(';')
        .find((c) => c.trim().startsWith(`${identifier}=`));
    if (!authorization) {
        throw new Error('Not authenticated');
    }
    const token = authorization.split('=')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string, {
        ignoreExpiration: true,
    });

    return payload as any;
};

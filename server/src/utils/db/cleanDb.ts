import { getConnection } from 'typeorm';
import { Lobby } from '../../entities/Lobby';

export const cleanDb = async () => {
    const changes = [];
    changes.push(
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Lobby, 'lobby')
            .execute()
    );
    return changes;
};

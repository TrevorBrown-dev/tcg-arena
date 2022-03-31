import { getConnection } from 'typeorm';
import { Lobby } from '../../entities/Lobby';

export const cleanDb = async () => {
    const lobbies = await Lobby.find();
    const changes: any[] = [];
    lobbies.forEach(async (lobby) => {
        if (lobby.members.length === 0) {
            changes.push(await lobby.remove());
        }
    });
    return changes;
};

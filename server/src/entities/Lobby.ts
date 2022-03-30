import { nanoid } from 'nanoid';
import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { pubsub } from '..';
import { Account } from './Account';
import { ChatMessage } from './ChatMessage';

@ObjectType()
@Entity()
export class Lobby extends BaseEntity {
    @Field(() => String)
    @PrimaryColumn()
    id: String = nanoid();

    @Field(() => [Account], { nullable: true })
    @OneToMany(() => Account, (account) => account.lobby, {
        onDelete: 'CASCADE',
        eager: true,
    })
    members!: Account[];

    @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.lobby, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    chatMessages!: ChatMessage[];

    static async joinLobby(lobbyId: string, accountId: number) {
        try {
            const lobby = await Lobby.findOne({
                where: { id: lobbyId },
                relations: ['members'],
            });

            if (!lobby) {
                console.log('That lobby does not exist');
                return null;
                // throw new Error(`Lobby not found with id: ${lobbyId}`)
            }

            const account = await Account.findOne({
                where: { id: accountId },
            });
            if (!account)
                throw new Error(`Account not found with id: ${accountId}`);
            if (
                lobby.members &&
                lobby.members.find((account) => {
                    return account.id === accountId;
                })
            ) {
                //Interesting case I need to figure out handling joining and leaving lobbies
                return lobby;
            }
            lobby.members.push(account);
            await lobby.save();

            return lobby;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async leaveLobby(lobbyId: string, accountId: number) {
        const lobby = await Lobby.findOne({
            where: { id: lobbyId },
            relations: ['members'],
        });
        if (!lobby) {
            console.log('No lobby found!');
            return false;
        }
        const member = lobby.members.find((m) => m.id === accountId);
        if (!member) {
            return false;
            // throw new Error(
            //     `Account with id ${accountId} is not in lobby ${lobbyId}`
            // );
        }
        lobby.members = lobby.members.filter((m) => m.id !== accountId);
        await lobby.save();
        pubsub.publish(`watchLobby_${lobby.id}`, {
            lobby,
        });
        setTimeout(async () => {
            const lobby = await Lobby.findOne({
                where: { id: lobbyId },
                relations: ['members'],
            });
            if (lobby?.members.length === 0) {
                console.log(`Lobby ${lobbyId} is empty, deleting`);
                await lobby.remove();
            }
        }, 5000);
        return true;
    }
}

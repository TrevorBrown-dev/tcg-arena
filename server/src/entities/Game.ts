import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { gameMaster } from '../game/GameMaster';
import { Account } from './Account';

@Entity()
@ObjectType()
export class Game extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    //!TODO add Player entity in stead of Account to consolidate any metadata we want to keep about each player

    @Field(() => Account, { nullable: true })
    @ManyToOne(() => Account, (account) => account.games)
    player1!: Account;

    @Field(() => Account, { nullable: true })
    @ManyToOne(() => Account, (account) => account.games)
    player2!: Account;

    @Field(() => String, { nullable: true })
    @Column()
    roomId!: string;

    /**
     * This is the start of a game, all players are added to the game
     *
     */
    async createGame() {
        //Create a game on the game master and link it to the database
        const roomId = await gameMaster.createGame({});
        this.roomId = roomId;

        //When done with setup save the entity
        await this.save();
    }
}

//! Data structure for game instaance use later

// const activeGames = new Map<number, Game>();
// class GameInstance {
//     @Field(() => Number)
//     id!: number;

//     @Field(() => Account, { nullable: true })
//     player1!: Account;

//     @Field(() => Account, { nullable: true })
//     player2!: Account;
// }

// @Resolver(GameInstance)
// class GameInstanceResolver {
//     @Query(() => [GameInstance])
//     async activeGames() {
//         const games = activeGames.values();
//         return Array.from(games);
//     }

//     @Subscription(() => GameInstance, {
//         topics: ({ args }) => {
//             const { gameId } = args;
//             return `game:${gameId}`;
//         },
//     })
//     gameUpdate(@Root() { gameId }: { gameId: number }) {
//         return pubsub.asyncIterator(`game:${gameId}`);
//     }
// }

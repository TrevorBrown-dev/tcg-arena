import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PlayerEntity } from './PlayerEntity';

@Entity()
@ObjectType()
export class GameEntity extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => PlayerEntity, { nullable: true })
    @ManyToOne(() => PlayerEntity, (player) => player.game, {
        onDelete: 'CASCADE',
    })
    player1!: PlayerEntity;

    @Field(() => PlayerEntity, { nullable: true })
    @ManyToOne(() => PlayerEntity, (player) => player.game, {
        onDelete: 'CASCADE',
    })
    player2!: PlayerEntity;

    @Field(() => String, { nullable: true })
    @Column()
    roomId!: string;
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

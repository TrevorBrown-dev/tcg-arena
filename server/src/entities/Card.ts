import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToMany,
} from 'typeorm';
import { CardLibrary } from './CardLibrary';

@ObjectType()
@Entity()
export class Card extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    description!: string;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    imageUrl!: string;

    @Field(() => String)
    @Column()
    code!: string;
}

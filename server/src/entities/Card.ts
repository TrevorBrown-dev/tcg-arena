import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToMany,
    OneToMany,
    AfterInsert,
    OneToOne,
    AfterUpdate,
} from 'typeorm';
import { CardLibrary } from './CardLibrary';
import { CardRecord } from './CardRecord';

export interface CardInfo {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    code: string;
}

@ObjectType()
@Entity()
export class Card extends BaseEntity implements CardInfo {
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

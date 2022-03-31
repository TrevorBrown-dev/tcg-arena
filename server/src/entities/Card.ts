import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CardInfo } from '../utils/types/CardTypes';

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

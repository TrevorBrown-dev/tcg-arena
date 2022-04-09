import { Field, ObjectType } from 'type-graphql';
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CardObjMetadata } from '../game/Player/Card';
import { Interpreter } from '../interpreter/Interpreter';
import { CardInfo } from '../utils/types/CardTypes';

@ObjectType()
@Entity()
export class Card extends BaseEntity implements CardInfo {
    @Field(() => Number)
    @PrimaryColumn({ unique: true })
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

    @Field(() => CardObjMetadata)
    get metadata(): CardObjMetadata {
        const parsedCode = Interpreter.parseCode(this.code).HEADER;
        return parsedCode;
    }
}

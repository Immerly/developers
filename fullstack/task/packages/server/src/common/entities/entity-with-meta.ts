import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export abstract class EntityWithMeta {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Field(() => Date)
    @CreateDateColumn({ type: 'timestamptz' })
    public createdAtUtc!: Date;

    @Field(() => Date, { nullable: true })
    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    public updatedAtUtc?: Date;

}

export const omittedEntityMetaColumns: (keyof EntityWithMeta)[] = [
    'updatedAtUtc',
    'createdAtUtc',
];

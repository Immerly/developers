import { Column, PrimaryColumn } from 'typeorm';

export abstract class Cache {
    @PrimaryColumn('uuid')
    public id!: string;

    @Column({ type: 'text' })
    public key!: string;

    @Column({ type: 'jsonb' })
    public value!: string;
}

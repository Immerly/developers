import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export abstract class Cache {
    @PrimaryColumn('uuid')
    public id!: string;

    @Column({ type: 'text' })
    public key!: string;

    @Column({ type: 'jsonb' })
    public value!: string;

    @Column({ type: 'timestamp' })
    public inserted_at!: Date;
}

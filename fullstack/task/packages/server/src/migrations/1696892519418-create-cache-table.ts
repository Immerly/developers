import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createCacheTable1696892519418 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE UNLOGGED TABLE cache (
            id serial PRIMARY KEY,
            key text UNIQUE NOT NULL,
            value jsonb,
            inserted_at timestamp
        );
    `);

        await queryRunner.createIndex(
            'cache',
            new TableIndex({
                name: 'idx_cache_key',
                columnNames: ['key'],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('cache', 'idx_cache_key');
        await queryRunner.dropTable(`cache`);
    }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createExchangeRateTable1696888267376 implements MigrationInterface {
    name = 'createExchangeRateTable1696888267376';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'exchange_rates',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'country',
                        type: 'varchar',
                    },
                    {
                        name: 'currency',
                        type: 'varchar',
                    },
                    {
                        name: 'amount',
                        type: 'int8',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                    },
                    {
                        name: 'exchange_rate',
                        type: 'float4',
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE exchange_rates`);
    }
}

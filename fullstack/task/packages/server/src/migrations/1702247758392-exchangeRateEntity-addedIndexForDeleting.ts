import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRateEntityAddedIndexForDeleting1702247758392 implements MigrationInterface {
    name = 'exchangeRateEntityAddedIndexForDeleting1702247758392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "index_createdAtUtc" ON "exchange_rate" ("createdAtUtc") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."index_createdAtUtc"`);
    }

}

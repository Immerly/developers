import { MigrationInterface, QueryRunner } from "typeorm";

export class addExchangeRateAmount1698232321453 implements MigrationInterface {
    name = 'addExchangeRateAmount1698232321453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" ADD "amount" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exchange_rate" DROP COLUMN "amount"`);
    }

}

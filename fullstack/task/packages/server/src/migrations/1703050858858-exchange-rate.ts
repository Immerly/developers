import { MigrationInterface, QueryRunner } from 'typeorm';

export class exchangeRate1703050858858 implements MigrationInterface {
    name = 'exchangeRate1703050858858';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "exchange_rate" ("id" SERIAL NOT NULL, "country" character varying(255) NOT NULL, "code" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "amount" integer NOT NULL, "rate" character varying(255) NOT NULL, "lastUpdated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }
}

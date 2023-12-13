import { MigrationInterface, QueryRunner } from "typeorm";

export class addedExchangeRate1702477772475 implements MigrationInterface {
    name = 'addedExchangeRate1702477772475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" SERIAL NOT NULL, "validFor" character varying, "order" integer NOT NULL, "country" character varying NOT NULL, "currency" character varying NOT NULL, "amount" integer NOT NULL, "currencyCode" character varying NOT NULL, "rate" numeric(10,4) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }

}

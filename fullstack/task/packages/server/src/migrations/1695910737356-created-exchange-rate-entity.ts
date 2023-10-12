import { MigrationInterface, QueryRunner } from "typeorm";

export class createdExchangeRateEntity1695910737356 implements MigrationInterface {
    name = 'createdExchangeRateEntity1695910737356'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ExchangeRate" ("currencyCode" character varying NOT NULL, "country" character varying(255) NOT NULL, "currency" character varying(255) NOT NULL, "amount" integer NOT NULL, "rate" double precision NOT NULL, "validFor" character varying(255) NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_cccd3cb3c302ce923dddd14f44c" PRIMARY KEY ("currencyCode"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ExchangeRate"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRateEntities1702245329899 implements MigrationInterface {
    name = 'exchangeRateEntities1702245329899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "currency" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "countryName" character varying(255) NOT NULL, "currencyName" character varying(255) NOT NULL, "currencyCode" character varying(255) NOT NULL, "amount" integer NOT NULL, "rate" numeric NOT NULL, CONSTRAINT "UQ_ac057ee5c1f1d5d7219154ece9b" UNIQUE ("currencyCode"), CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exchange_rate_metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "lastFetchedDate" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_9a95d78af2e65c3214e2e4977b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate_metadata"`);
        await queryRunner.query(`DROP TABLE "currency"`);
    }

}

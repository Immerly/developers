import { MigrationInterface, QueryRunner } from "typeorm";

export class exchangeRateMigration1696772076669 implements MigrationInterface {
  name = 'exchangeRateMigration1696772076669'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "country" character varying NOT NULL, "currency" character varying NOT NULL, "amount" integer NOT NULL, "code" character varying NOT NULL, "rate" numeric(10,3) NOT NULL, CONSTRAINT "UQ_45c59f8f2188f5404ef4637f546" UNIQUE ("country"), CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE MATERIALIZED VIEW "materialized_exchange_rate" AS SELECT * FROM exchange_rate`);
    await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, $1, DEFAULT, $2, $3, $4)`, ["public", "MATERIALIZED_VIEW", "materialized_exchange_rate", "SELECT * FROM exchange_rate"]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = $1 AND "name" = $2 AND "schema" = $3`, ["MATERIALIZED_VIEW", "materialized_exchange_rate", "public"]);
    await queryRunner.query(`DROP MATERIALIZED VIEW "materialized_exchange_rate"`);
    await queryRunner.query(`DROP TABLE "exchange_rate"`);
  }
}

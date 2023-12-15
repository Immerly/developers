import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCurrencyTable1701849078432 implements MigrationInterface {
    name = 'createExchangeRateTable1701849078432';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "exchange_rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "amount" numeric(100,2) NOT NULL, "currency" character varying(20) NOT NULL, "country" character varying(50) NOT NULL, "currency_code" character varying(10) NOT NULL, "rate" numeric(100,6) NOT NULL, CONSTRAINT "PK_01dd40ec85a5fffcd14f8bcf88f" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rate"`);
    }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class exampleMigration1695735084572 implements MigrationInterface {
    name = 'exampleMigration1695735084572';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "exchange_rate" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleteDateUtc" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL,
                "country" character varying(255) NOT NULL,
                "currency" character varying(255) NOT NULL,
                "amount" character varying(255) NOT NULL,
                "code" character varying(255) NOT NULL,
                "rate" character varying(255) NOT NULL,
                CONSTRAINT "PK_610dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `INSERT INTO "exchange_rate" (
                    "version" ,
                    "country" ,
                    "currency" ,
                    "amount" ,
                    "code" ,
                    "rate" )

                VALUES (
                    1 ,
                    'country value' ,
                    'currency value' ,
                    'amount value' ,
                    'code value' ,
                    'rate value' )`

        );
        await queryRunner.query(
            `CREATE TABLE "example" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "deleteDateUtc" TIMESTAMP WITH TIME ZONE,
                "version" integer NOT NULL,
                "name" character varying(255) NOT NULL,
                "value" character varying(255) NOT NULL,
                CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `INSERT INTO "example" ("version", "name", "value") VALUES (1, 'example1', 'value1')`
        );
        await queryRunner.query(
            `INSERT INTO "example" ("version", "name", "value") VALUES (1, 'example2', 'value2')`
        );
        await queryRunner.query(
            `INSERT INTO "example" ("version", "name", "value") VALUES (1, 'example3', 'value3')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example"`);
    }
}

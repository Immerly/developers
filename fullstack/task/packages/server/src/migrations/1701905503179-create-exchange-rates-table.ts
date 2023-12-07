import { MigrationInterface, QueryRunner } from "typeorm";

export class createExchangeRatesTable1701905503179 implements MigrationInterface {
    name = 'createExchangeRatesTable1701905503179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "exchange_rates" 
                (
                    "id" SERIAL NOT NULL, "country" character varying(25) NOT NULL, 
                    "currency" character varying(10) NOT NULL, "amount" integer NOT NULL, 
                    "code" character varying(3) NOT NULL, "rate" double precision NOT NULL, 
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                    CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id")
                )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
    }

}

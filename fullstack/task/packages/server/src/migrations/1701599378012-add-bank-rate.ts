import { MigrationInterface, QueryRunner } from "typeorm";

export class addBankRate1701599378012 implements MigrationInterface {
    name = 'addBankRate1701599378012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const owner = process.env.DB_USERNAME;
        await queryRunner.query(`
            CREATE TABLE bank_rate
            (
                id SERIAL CONSTRAINT "PK_8e14b9cbe5c3a096dd3e1772249" PRIMARY KEY,
                country VARCHAR(10) NOT NULL,
                currency VARCHAR(20) NOT NULL,
                amount INTEGER NOT NULL,
                code VARCHAR(5) NOT NULL,
                rate DOUBLE PRECISION NOT NULL,
                deleted_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );

            ALTER TABLE bank_rate OWNER TO ${owner};
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bank_rate"`);
    }

}

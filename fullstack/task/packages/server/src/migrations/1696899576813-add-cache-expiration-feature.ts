import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCacheExpirationFeature1696899576813 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE OR REPLACE PROCEDURE expire_rows (retention_period INTERVAL) AS
            $$
            BEGIN
                DELETE FROM cache
                WHERE inserted_at < NOW() - retention_period;

                COMMIT;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            SELECT cron.schedule('*/5 * * * *', $$CALL expire_rows('5 minutes');$$);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            SELECT cron.unschedule('*/5 * * * *', $$CALL expire_rows('5 minutes');$$);
        `);

        await queryRunner.query(`
            DROP PROCEDURE IF EXISTS expire_rows(retention_period INTERVAL);
        `);
    }
}

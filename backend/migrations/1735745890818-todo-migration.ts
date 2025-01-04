import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoMigration1735745890818 implements MigrationInterface {
    name = 'TodoMigration1735745890818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ALTER COLUMN "due_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "inlaze"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ALTER COLUMN "due_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "inlaze"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

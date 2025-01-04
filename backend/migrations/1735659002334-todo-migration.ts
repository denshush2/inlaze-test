import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoMigration1735659002334 implements MigrationInterface {
    name = 'TodoMigration1735659002334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "inlaze"."tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "row_status" character varying NOT NULL DEFAULT 'active', "deleted_at" TIMESTAMP, "deleted_by" character varying, "created_by" character varying, "updated_by" character varying, "task_public_id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "due_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL DEFAULT 'open', "userId" integer, CONSTRAINT "UQ_da0de821053e7a856b44211b763" UNIQUE ("task_public_id"), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inlaze"."users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "row_status" character varying NOT NULL DEFAULT 'active', "deleted_at" TIMESTAMP, "deleted_by" character varying, "created_by" character varying, "updated_by" character varying, "username" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "inlaze"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inlaze"."tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`DROP TABLE "inlaze"."users"`);
        await queryRunner.query(`DROP TABLE "inlaze"."tasks"`);
    }

}

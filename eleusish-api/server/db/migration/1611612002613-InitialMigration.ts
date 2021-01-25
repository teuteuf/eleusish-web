import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1611612002613 implements MigrationInterface {
    name = 'InitialMigration1611612002613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" character varying NOT NULL, "pseudo" character varying NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rule_name" ("id" character varying NOT NULL, "godName" character varying NOT NULL, "number" integer NOT NULL, CONSTRAINT "PK_30cea93e2cb255cd81d82cc07dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rule" ("id" character varying NOT NULL, "code" character varying NOT NULL, "validated" boolean NOT NULL, "index" integer, "authorId" character varying, "ruleNameId" character varying, CONSTRAINT "PK_a5577f464213af7ffbe866e3cb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "FK_b750d4214d119904b59b70d0273" FOREIGN KEY ("authorId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rule" ADD CONSTRAINT "FK_c87def443f1890163667d1a4fb9" FOREIGN KEY ("ruleNameId") REFERENCES "rule_name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "FK_c87def443f1890163667d1a4fb9"`);
        await queryRunner.query(`ALTER TABLE "rule" DROP CONSTRAINT "FK_b750d4214d119904b59b70d0273"`);
        await queryRunner.query(`DROP TABLE "rule"`);
        await queryRunner.query(`DROP TABLE "rule_name"`);
        await queryRunner.query(`DROP TABLE "player"`);
    }

}

import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddShortDescriptionInRule1611783972937
  implements MigrationInterface {
  name = 'AddShortDescriptionInRule1611783972937'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rule" ADD "shortDescription" character varying`
    )
    await queryRunner.query(`UPDATE "rule" SET "shortDescription" = ''`)
    await queryRunner.query(
      `ALTER TABLE "rule" ALTER COLUMN "shortDescription" SET NOT NULL`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "rule" DROP COLUMN "shortDescription"`)
  }
}

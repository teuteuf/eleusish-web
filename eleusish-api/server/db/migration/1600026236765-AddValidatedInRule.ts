import { MigrationInterface, QueryRunner } from 'typeorm'
import { TableColumn } from 'typeorm'

export class AddValidatedInRule1600026236765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rule',
      new TableColumn({
        name: 'validated',
        type: 'boolean',
        isNullable: false,
        default: false,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rule', 'validated')
  }
}

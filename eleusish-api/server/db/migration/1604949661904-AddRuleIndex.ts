import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddRuleIndex1604949661904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rule',
      new TableColumn({
        name: 'index',
        type: 'int',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rule', 'index')
  }
}

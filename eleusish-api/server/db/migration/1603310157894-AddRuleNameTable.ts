import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddRuleNameTable1603310157894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rule_name',
        columns: [
          {
            name: 'id',
            type: 'text',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'godName',
            type: 'text',
          },
          {
            name: 'number',
            type: 'int',
          },
        ],
      })
    )

    await queryRunner.addColumn(
      'rule',
      new TableColumn({
        name: 'ruleNameId',
        type: 'text',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'rule',
      new TableForeignKey({
        columnNames: ['ruleNameId'],
        referencedTableName: 'rule_name',
        referencedColumnNames: ['id'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rule', 'ruleNameId')
    await queryRunner.dropTable('rule_name')
  }
}

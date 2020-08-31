import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRuleTable1596373239386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rule',
        columns: [
          {
            name: 'id',
            type: 'text',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'code',
            type: 'text',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rule')
  }
}

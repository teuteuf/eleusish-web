import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm'

export class AddAuthorInRule1598904007020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rule',
      new TableColumn({
        name: 'authorId',
        type: 'text',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'rule',
      new TableForeignKey({
        columnNames: ['authorId'],
        referencedTableName: 'player',
        referencedColumnNames: ['id'],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rule', 'authorId')
  }
}

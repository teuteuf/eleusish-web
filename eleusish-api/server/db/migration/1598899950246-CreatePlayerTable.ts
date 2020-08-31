import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreatePlayerTable1598899950246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'player',
        columns: [
          {
            name: 'id',
            type: 'text',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'pseudo',
            type: 'text',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('player')
  }
}

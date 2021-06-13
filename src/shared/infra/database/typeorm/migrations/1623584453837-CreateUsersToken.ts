import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm'

export class CreateUsersToken1623584453837 implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'refresh_token', type: 'varchar' },
          { name: 'user_id', type: 'uuid' },
          { name: 'expires_date', type: 'timestamp' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' }
        ]
      })
    )

    await queryRunner.createForeignKey(
      'users_tokens',
      new TableForeignKey({
        name: 'fk_users_tokens_users',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropForeignKey(
      'users_tokens',
      'fk_users_tokens_users'
    )
    await queryRunner.dropTable('users_tokens')
  }
}

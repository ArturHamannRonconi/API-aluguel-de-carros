import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1622001911933 implements MigrationInterface
{

  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', isGenerated: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'username', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
          { name: 'password', type: 'varchar', isNullable: false },
          { name: 'driver_license', type: 'varchar', isNullable: false },
          { name: 'is_admin', type: 'boolean', default: false },
          { name: 'avatar', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.clearTable('users')
    await queryRunner.dropTable('users')
  }

}

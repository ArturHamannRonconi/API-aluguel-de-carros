import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCars1622460485876 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          { name: 'daily_rate', type: 'numeric' },
          { name: 'avaliable', type: 'boolean', default: true },
          { name: 'license_plate', type: 'varchar' },
          { name: 'fine_amount', type: 'numeric' },
          { name: 'brand', type: 'varchar' },
          { name: 'category', type: 'uuid', isNullable: true },
          { name: 'created_at', type: 'timestamp', default: 'now()' }
        ],
        foreignKeys: [
          {
            name: 'fk_cars_category',
            columnNames: ['category'],
            referencedTableName: 'categories',
            referencedColumnNames: ['id'],
            onDelete: 'SET_NULL',
            onUpdate: 'SET_NULL'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropTable('cars')
  }

}

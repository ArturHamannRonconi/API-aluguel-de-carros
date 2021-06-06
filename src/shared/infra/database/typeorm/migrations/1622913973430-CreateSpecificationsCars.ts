import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateSpecificationsCars1622913973430 implements MigrationInterface
{
  public fk_specification_id: TableForeignKey
  public fk_car_id: TableForeignKey

  constructor()
  {
    this.fk_car_id = new TableForeignKey({
      name: 'fk_car_id',
      columnNames: ['car_id'],
      referencedTableName: 'cars',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    
    this.fk_specification_id = new TableForeignKey({
      name: 'fk_specification_id',
      columnNames: ['specification_id'],
      referencedTableName: 'specifications',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    })
  }

  public async up(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'car_id', type: 'uuid' },
          { name: 'specification_id', type: 'uuid' },
          { name: 'created_at', type: 'timestamp', default: 'NOW()' },
        ]
      })
    )
    
    await queryRunner.createForeignKeys(
      'specifications_cars',
      [ this.fk_car_id, this.fk_specification_id ]
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void>
  {
    await queryRunner.dropForeignKeys(
      'specifications_cars',
      [ this.fk_car_id, this.fk_specification_id ]
    )
    
    await queryRunner.dropTable('specifications_cars')
  }
}

import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

import ICar from '@cars/entities/interfaces/ICar'
import CategoryTypeOrm from './CategoryTypeOrm'
import SpecificationTypeOrm from './SpecificationTypeOrm'

@Entity('cars')
class CarTypeOrm implements ICar
{
  @PrimaryColumn()
  id: string
  
  @Column()
  name: string
  
  @Column()
  description: string
  
  @Column()
  daily_rate: number
  
  @Column()
  available: boolean
  
  @Column()
  license_plate: string
  
  @Column()
  fine_amount: number
  
  @Column()
  brand: string
  
  @Column()  
  category_id: string
  
  @ManyToOne(() => CategoryTypeOrm)
  @JoinColumn({ name: 'category_id' })
  category: CategoryTypeOrm

  @ManyToMany(() => SpecificationTypeOrm)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: { name: 'car_id' },
    inverseJoinColumn: { name: 'specification_id' }
  })
  specifications: SpecificationTypeOrm[]

  @CreateDateColumn()
  created_at: Date
}

export default CarTypeOrm
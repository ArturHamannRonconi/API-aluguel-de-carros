import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

import ICar from '@cars/entities/interfaces/ICar'
import CategoryTypeOrm from './CategoryTypeOrm'

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
  
  @ManyToOne(() => CategoryTypeOrm, category => category.cars)
  @JoinColumn({ name: 'category_id' })
  category: CategoryTypeOrm

  @CreateDateColumn()
  created_at: Date
}

export default CarTypeOrm
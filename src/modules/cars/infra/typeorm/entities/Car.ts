import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

import ICar from '@cars/entities/ICar'

// @Entity('cars')
class Car implements ICar
{
  // @PrimaryColumn()
  id: string

  // @Column()
  name: string
  
  // @Column()
  description: string
  
  // @Column()
  daily_rate: number
  
  // @Column()
  available: boolean
  
  // @Column()
  license_plate: string
  
  // @Column()
  fine_amount: number
  
  // @Column()
  brand: string
  
  // @ManyToOne()
  category_id: string
  
  // @CreateDateColumn()
  created_at: Date
}

export default Car
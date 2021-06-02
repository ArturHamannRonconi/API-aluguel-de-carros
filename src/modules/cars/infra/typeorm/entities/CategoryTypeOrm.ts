import { Column, Entity, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm'

import ICategory from '@cars/entities/interfaces/ICategory'
import CarTypeOrm from './CarTypeOrm'

@Entity('categories')
class CategoryTypeOrm implements ICategory
{
  @PrimaryColumn()
  id: string
  
  @Column()
  name: string

  @Column()
  description: string

  @OneToMany(() => CarTypeOrm, car => car.category)
  cars: CarTypeOrm[]

  @CreateDateColumn()
  created_at: Date
}

export default CategoryTypeOrm
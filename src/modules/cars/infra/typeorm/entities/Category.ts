import { Column, Entity, CreateDateColumn, PrimaryColumn } from 'typeorm'

import ICategory from '@cars/entities/interfaces/ICategory'

@Entity('categories')
class Category implements ICategory
{
  @PrimaryColumn()
  id: string
  
  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date
}

export default Category
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

import ISpecification from '@cars/entities/ISpecification'

@Entity('specifications')
class Specification implements ISpecification
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

export default Specification





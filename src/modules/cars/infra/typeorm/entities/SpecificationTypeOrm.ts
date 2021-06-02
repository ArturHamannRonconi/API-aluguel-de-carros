import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

import ISpecification from '@cars/entities/interfaces/ISpecification'

@Entity('specifications')
class SpecificationTypeOrm implements ISpecification
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

export default SpecificationTypeOrm





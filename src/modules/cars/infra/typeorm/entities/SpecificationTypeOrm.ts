import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import ISpecification from '@cars/entities/interfaces/ISpecification'
import CarTypeOrm from './CarTypeOrm'

@Entity('specifications')
class SpecificationTypeOrm implements ISpecification
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @ManyToMany(() => CarTypeOrm)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: { name: 'specification_id' },
    inverseJoinColumn: { name: 'car_id' }
  })
  cars: CarTypeOrm[]

  @CreateDateColumn()
  created_at: Date
}

export default SpecificationTypeOrm





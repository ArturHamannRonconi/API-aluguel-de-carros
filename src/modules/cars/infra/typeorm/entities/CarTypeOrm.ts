import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import ICar from '@cars/entities/interfaces/ICar'
import CategoryTypeOrm from './CategoryTypeOrm'
import SpecificationTypeOrm from './SpecificationTypeOrm'
import CarImageTypeOrm from './CarImageTypeOrm'
import RentalTypeOrm from '@rentals/infra/typeorm/entities/RetalTypeOrm'

@Entity('cars')
class CarTypeOrm implements ICar
{
  @PrimaryGeneratedColumn('uuid')
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
  
  @OneToMany(() => CarImageTypeOrm, image => image.car)
  images: CarImageTypeOrm[]

  @OneToMany(() => RentalTypeOrm, rental => rental.car)
  rentals: RentalTypeOrm[]

  @ManyToMany(() => SpecificationTypeOrm, specification => specification.cars)
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
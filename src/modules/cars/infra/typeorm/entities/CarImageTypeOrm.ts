import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import ICarImage from '@cars/entities/interfaces/ICarImage'
import CarTypeOrm from './CarTypeOrm'

@Entity('cars_image')
class CarImageTypeOrm implements ICarImage
{
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  image_name: string
  
  @Column()
  car_id: string

  @ManyToOne(() => CarTypeOrm, car => car.images)
  @JoinColumn({ name: 'car_id' })
  car: CarTypeOrm
  
  @CreateDateColumn()
  created_at: Date
}

export default CarImageTypeOrm
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import IRental from '@rentals/entities/interfaces/IRental'
import CarTypeOrm from '@cars/infra/typeorm/entities/CarTypeOrm'
import UserTypeOrm from '@accounts/infra/typeorm/entities/UserTypeOrm'

@Entity('rentals')
class RentalTypeOrm implements IRental
{
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  car_id: string

  @ManyToOne(() => CarTypeOrm, car => car.rentals)
  @JoinColumn({ name: 'car_id' })
  car: CarTypeOrm
  
  @Column()
  user_id: string
  
  @ManyToOne(() => UserTypeOrm, user => user.rentals)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrm
  
  @Column()
  start_date: Date
  
  @Column()
  end_date: Date
  
  @Column()
  expect_return_date: Date
  
  @Column()
  total: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default RentalTypeOrm
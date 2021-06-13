import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import IUser from '@accounts/entities/interfaces/IUser'
import RentalTypeOrm from '@rentals/infra/typeorm/entities/RetalTypeOrm'
import UserTokenTypeOrm from './UserTokenTypeOrm'

@Entity('users')
class UserTypeOrm implements IUser
{
  @PrimaryGeneratedColumn('uuid') 
  id: string
  
  @Column()
  name: string
  
  @Column()
  username: string
  
  @Column()
  email: string
  
  @OneToMany(() => RentalTypeOrm, rental => rental.user)
  rentals: RentalTypeOrm[]
  
  @OneToMany(() => UserTokenTypeOrm, token => token.user)
  tokens: UserTokenTypeOrm[]

  @Column()
  password: string

  @Column()
  driver_license: string

  @Column()
  is_admin: boolean

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date
}

export default UserTypeOrm
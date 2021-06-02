import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

import IUser from '@accounts/entities/interfaces/IUser'

@Entity('users')
class UserTypeOrm implements IUser
{
  @PrimaryColumn() 
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  email: string

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
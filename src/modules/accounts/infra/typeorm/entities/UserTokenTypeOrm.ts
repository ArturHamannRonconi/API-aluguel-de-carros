import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import IUserToken from '@accounts/entities/interfaces/IUserToken'
import UserTypeOrm from './UserTypeOrm'

@Entity('users_tokens')
class UserTokenTypeOrm implements IUserToken
{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  refresh_token: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UserTypeOrm, user => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: UserTypeOrm;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;
}

export default UserTokenTypeOrm
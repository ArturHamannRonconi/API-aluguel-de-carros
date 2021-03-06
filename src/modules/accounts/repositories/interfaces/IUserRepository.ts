import IUser from '@accounts/entities/interfaces/IUser'
import CreateUser from '@myTypes/CreateUser'
import UserAccount from '@myTypes/UserAccount'
import UserUpdate from '@myTypes/UserUpdate'

interface IUserRepository
{
  create(userData: CreateUser): Promise<void>
  update({ user_id, add_info }: UserUpdate): Promise<void>
  findAll(): Promise<IUser[]>
  findById(id: string): Promise<IUser>
  findByEmail(email: string): Promise<IUser>
  findByUsername(username: string): Promise<IUser>
  verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<IUser>
}

export default IUserRepository
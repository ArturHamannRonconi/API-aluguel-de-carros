import User from '../../entities/User'
import CreateUser from '../../@types/CreateUser'
import UserAccount from '../../@types/UserAccount'
import UserUpdate from '../../@types/UserUpdate'

interface IUserRepository
{
  create(User: CreateUser): Promise<void>
  update({ user_id, add_info }: UserUpdate): Promise<void>
  list(): Promise<User[]>
  findById(id: string): Promise<User>
  findByEmail(email: string): Promise<User>
  findByUsername(username: string): Promise<User>
  verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<User>
}

export default IUserRepository
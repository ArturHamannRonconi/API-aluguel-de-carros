import { v4 as generateUUID } from 'uuid'

import CreateUser from '@myTypes/CreateUser'
import UserAccount from '@myTypes/UserAccount'
import UserUpdate from '@myTypes/UserUpdate'
import IUser from '@accounts/entities/interfaces/IUser'
import IUserRepository from '../interfaces/IUserRepository'
import UserInMeMory from '@accounts/entities/in-memeory/UserInMemory'

class UserRepositoryInMemory implements IUserRepository
{
  private repository: IUser[]

  constructor()
  {
    this.repository = []
  }

  public async create(userData: CreateUser): Promise<void>
  {
    const user = new UserInMeMory()

    Object.assign(user, {
      ...userData,
      id: generateUUID(),
      is_admin: false,
      avatar: null,
      created_at: new Date 
    })

    this.repository.push(user)
  }

  public async update({ user_id, add_info }: UserUpdate): Promise<void>
  {
    const user = this.findById(user_id)
    Object.assign(user, add_info)
  }
  
  public async list(): Promise<IUser[]>
  {
    return this.repository
  }
  
  public async findById(id: string): Promise<IUser>
  {
    const user = this.repository.find(user => user.id === id)
    return user
  }
  
  public async findByEmail(email: string): Promise<IUser>
  {
    const user = this.repository.find(user => user.email === email)
    return user
  }
  
  public async findByUsername(username: string): Promise<IUser>
  {
    const user = this.repository.find(user => user.username === username)
    return user
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<IUser>
  {
    const user = this.repository.find(user => user.username === username && user.email === email)
    return user
  }
}

export default UserRepositoryInMemory
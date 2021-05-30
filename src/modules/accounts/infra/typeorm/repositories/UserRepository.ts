import { getRepository, Repository } from 'typeorm'

import User from '@accounts/infra/typeorm/entities/User'
import CreateUser from '@myTypes/CreateUser'
import UserAccount from '@myTypes/UserAccount'
import UserUpdate from '@myTypes/UserUpdate'
import IUser from '@accounts/entities/interfaces/IUser'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'

class UserRepository implements IUserRepository
{
  private repository: Repository<IUser>

  constructor()
  {
    this.repository = getRepository(User)
  }

  public async create(userData: CreateUser): Promise<void>
  {
    const user = this.repository.create(userData)
    await this.repository.save(user)
  }

  public async update({ user_id, add_info }: UserUpdate): Promise<void>
  {
    await this.repository.update(user_id, add_info)
  }

  public async list(): Promise<IUser[]>
  {
    const users = await this.repository.find()
    return users
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<IUser>
  {
    const user = await this.repository.findOne({ email, username })
    return user
  }

  public async findByEmail(email: string): Promise<IUser>
  {
    const user = await this.repository.findOne({ email })
    return user
  }

  public async findByUsername(username: string): Promise<IUser>
  {
    const user = await this.repository.findOne({ username })
    return user
  }

  public async findById(id: string): Promise<IUser>
  {
    const user = await this.repository.findOne(id)
    return user
  }
}

export default UserRepository
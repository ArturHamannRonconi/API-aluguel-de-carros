import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'
import IUserRepository from './interfaces/IUserRepository'
import CreateUser from '../@types/CreateUser'
import UserAccount from '../@types/UserAccount'
import UserUpdate from '../@types/UserUpdate'

class UserRepository implements IUserRepository
{
  private repository: Repository<User>

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

  public async list(): Promise<User[]>
  {
    const users = await this.repository.find()
    return users
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<User>
  {
    const user = await this.repository.findOne({ email, username })
    return user
  }

  public async findByEmail(email: string): Promise<User>
  {
    const user = await this.repository.findOne({ email })
    return user
  }

  public async findByUsername(username: string): Promise<User>
  {
    const user = await this.repository.findOne({ username })
    return user
  }

  public async findById(id: string): Promise<User>
  {
    const user = await this.repository.findOne(id)
    return user
  }
}

export default UserRepository
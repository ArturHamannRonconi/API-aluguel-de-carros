import { getRepository, Repository } from 'typeorm'

import UserTypeOrm from '@accounts/infra/typeorm/entities/UserTypeOrm'
import CreateUser from '@myTypes/CreateUser'
import UserAccount from '@myTypes/UserAccount'
import UserUpdate from '@myTypes/UserUpdate'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'

class UserRepository implements IUserRepository
{
  private repository: Repository<UserTypeOrm>

  constructor()
  {
    this.repository = getRepository(UserTypeOrm)
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

  public async list(): Promise<UserTypeOrm[]>
  {
    const users = await this.repository.find()
    return users
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<UserTypeOrm>
  {
    const user = await this.repository.findOne({ email, username })
    return user
  }

  public async findByEmail(email: string): Promise<UserTypeOrm>
  {
    const user = await this.repository.findOne({ email })
    return user
  }

  public async findByUsername(username: string): Promise<UserTypeOrm>
  {
    const user = await this.repository.findOne({ username })
    return user
  }

  public async findById(id: string): Promise<UserTypeOrm>
  {
    const user = await this.repository.findOne(id)
    return user
  }
}

export default UserRepository
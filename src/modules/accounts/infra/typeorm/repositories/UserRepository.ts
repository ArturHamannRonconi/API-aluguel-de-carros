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

  public async findAll(): Promise<UserTypeOrm[]>
  {
    return await this.repository.find()
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<UserTypeOrm>
  {
    return await this.repository.findOne({ email, username })
  }

  public async findByEmail(email: string): Promise<UserTypeOrm>
  {
    return await this.repository.findOne({ email })
  }

  public async findByUsername(username: string): Promise<UserTypeOrm>
  {
    return await this.repository.findOne({ username })
  }

  public async findById(id: string): Promise<UserTypeOrm>
  {
    return await this.repository.findOne(id)
  }
}

export default UserRepository
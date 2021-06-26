import { getRepository, Repository } from 'typeorm'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import CreateUserToken from '@myTypes/CreateUserToken'
import UserTokenTypeOrm from '../entities/UserTokenTypeOrm'
import IUserToken from '@accounts/entities/interfaces/IUserToken'

class UserTokenRepository implements IUserTokenRepository
{
  private repository: Repository<UserTokenTypeOrm>

  constructor()
  {
    this.repository = getRepository(UserTokenTypeOrm)
  }

  public async findByToken(token: string): Promise<IUserToken>
  {
    return this.repository.findOne({ refresh_token: token })
  }

  public async deleteById(id: string): Promise<void>
  {
    await this.repository.delete(id)
  }

  public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokenTypeOrm>
  {
    return this.repository.findOne({ user_id, refresh_token })
  }

  public async create(tokenInfo: CreateUserToken): Promise<UserTokenTypeOrm>
  {
    const token = this.repository.create(tokenInfo)
    return this.repository.save(token)
  }
}

export default UserTokenRepository
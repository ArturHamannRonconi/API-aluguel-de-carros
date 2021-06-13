import { getRepository, Repository } from 'typeorm'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import CreateUserToken from '@myTypes/CreateUserToken'
import UserTokenTypeOrm from '../entities/UserTokenTypeOrm'

class UserTokenRepository implements IUserTokenRepository
{
  private repository: Repository<UserTokenTypeOrm>

  constructor()
  {
    this.repository = getRepository(UserTokenTypeOrm)
  }

  public async create(tokenInfo: CreateUserToken): Promise<UserTokenTypeOrm>
  {
    const token = this.repository.create(tokenInfo)
    return this.repository.save(token)
  }
}

export default UserTokenRepository
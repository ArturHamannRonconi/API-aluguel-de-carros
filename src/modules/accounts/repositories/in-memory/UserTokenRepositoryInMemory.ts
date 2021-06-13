import { v4 as generateUUID} from 'uuid'

import UserToken from '@accounts/entities/implementations/UserToken'
import CreateUserToken from '@myTypes/CreateUserToken'
import IUserTokenRepository from '../interfaces/IUserTokenRepository'

class UserTokenRepositoryInMemory implements IUserTokenRepository
{
  private repository: UserToken[]

  constructor()
  {
    this.repository = []
  }

  public async create(tokenInfo: CreateUserToken): Promise<UserToken>
  {
    const token = Object.assign(new UserToken(), {
      ...tokenInfo,
      id: generateUUID(),
      created_at: new Date
    })

    this.repository.push(token)
    return token
  }
}

export default UserTokenRepositoryInMemory
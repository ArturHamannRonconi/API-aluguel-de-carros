import { v4 as generateUUID} from 'uuid'

import UserToken from '@accounts/entities/implementations/UserToken'
import CreateUserToken from '@myTypes/CreateUserToken'
import IUserTokenRepository from '../interfaces/IUserTokenRepository'
import IUserToken from '@accounts/entities/interfaces/IUserToken'

class UserTokenRepositoryInMemory implements IUserTokenRepository
{
  private repository: UserToken[]

  constructor()
  {
    this.repository = []
  }

  public async deleteById(id: string): Promise<void>
  {
    const tokenIndex = this.repository.findIndex(token => token.id === id)
    
    this.repository.splice(tokenIndex, 1)
  }

  public async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserToken>
  {
    return this.repository.find(token =>
      token.user_id === user_id
                &&
      token.refresh_token === refresh_token
    )
  }

  public async findByToken(token: string): Promise<IUserToken>
  {
    return this.repository.find(recivery_token => recivery_token.refresh_token === token)
  }

  public async findByUserId(user_id: string): Promise<UserToken[]>
  {
    return this.repository.filter(token => token.user_id === user_id)
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
import IUserToken from '@accounts/entities/interfaces/IUserToken'
import CreateUserToken from '@myTypes/CreateUserToken'

interface IUserTokenRepository
{
  create(tokenInfo: CreateUserToken): Promise<IUserToken>
  deleteById(id: string): Promise<void>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<IUserToken>
  findByToken(token: string): Promise<IUserToken>
}

export default IUserTokenRepository
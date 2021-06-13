import IUserToken from '@accounts/entities/interfaces/IUserToken'
import CreateUserToken from '@myTypes/CreateUserToken'

interface IUserTokenRepository
{
  create(tokenInfo: CreateUserToken): Promise<IUserToken>
}

export default IUserTokenRepository
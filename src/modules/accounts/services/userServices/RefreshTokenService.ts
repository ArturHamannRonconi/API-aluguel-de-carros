import { inject, injectable } from 'tsyringe'
import { sign, verify } from 'jsonwebtoken'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import Auth from '@config/Auth'
import PayloadDecoded from '@myTypes/PayloadDecoded'
import AppError from '@shared/errors/AppError'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

@injectable()
class RefreshTokenService
{
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) { }

  public async execute(token: string): Promise<string>
  {
    const { sub, email } = verify(token, Auth.PRIVATE_KEY_REFRESH_TOKEN) as PayloadDecoded
    const user_id = sub

    const refreshToken = await this.userTokenRepository
      .findByUserIdAndRefreshToken(user_id, token)
    if(!refreshToken) throw new AppError('Refresh token does not exists', 404)

    await this.userTokenRepository.deleteById(refreshToken.id)

    const refresh_token = sign({ email }, Auth.PRIVATE_KEY_REFRESH_TOKEN, {
      subject: user_id,
      expiresIn: Auth.EXPIRES_REFRESH_TOKEN
    })
    await this.userTokenRepository.create({
      user_id: user_id,
      expires_date: DayjsDateProvider.addDays(Auth.EXPIRES_REFRESH_TOKEN_DAYS),
      refresh_token
    })

    return refresh_token
  }
}

export default RefreshTokenService
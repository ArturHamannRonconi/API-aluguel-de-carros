import { compare } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { SignOptions, sign } from 'jsonwebtoken'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserAccount from '@myTypes/UserAccount'
import Payload from '@myTypes/Payload'
import AuthenticateResponse from '@myTypes/AuthenticateReponse'
import AppError from '@shared/errors/AppError'
import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import Auth from '@config/Auth'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

@injectable()
class AuthenticateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository
  ) {  }

  public async execute({ email, username, password }: UserAccount): Promise<AuthenticateResponse>
  {
    const user = await this.userRepository.verifyEmailAndUsernameExists({ email, username })
    const passwordMatch = await compare(password, user?.password ?? password)

    if(!user || !passwordMatch)
      throw new AppError('Email, username or password incorrect')

    const payloadToken: Payload = {  }
    const payloadRefreshToken: Payload = { email }
    const optionsRefreshToken: SignOptions = {
      subject: user.id,
      expiresIn: Auth.EXPIRES_REFRESH_TOKEN
    }
    const optionsToken: SignOptions = {
      subject: user.id,
      expiresIn: Auth.EXPIRES_TOKEN
    }

    const token = sign(payloadToken, Auth.PRIVATE_KEY_TOKEN, optionsToken)
    const refresh_token = sign(payloadRefreshToken, Auth.PRIVATE_KEY_REFRESH_TOKEN, optionsRefreshToken) 

    await this.userTokenRepository.create({
      user_id: user.id,
      expires_date: DayjsDateProvider.addDays(Auth.EXPIRES_REFRESH_TOKEN_DAYS),
      refresh_token
    })

    return { token, refresh_token }
  }
}

export default AuthenticateUserService
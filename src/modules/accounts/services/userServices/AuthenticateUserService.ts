import { inject, injectable } from 'tsyringe'
import { compare } from 'bcrypt'
import { SignOptions, Secret, sign } from 'jsonwebtoken'

import IUserRepository from '../../repositories/interfaces/IUserRepository'
import UserAccount from '../../@types/UserAccount'
import Payload from '../../@types/Payload'
import AuthenticateResponse from '../../@types/AuthenticateReponse'
import AppError from '../../../../errors/AppError'

@injectable()
class AuthenticateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute({ email, username, password }: UserAccount): Promise<AuthenticateResponse>
  {
    const user = await this.userRepository.verifyEmailAndUsernameExists({ email, username })
    const passwordMatch = await compare(password, user?.password ?? password)

    if(!user || !passwordMatch)
      throw new AppError('Email, username or password incorrect')

    const payload: Payload = {  }
    const privateKey: Secret = '7a08a0940a9343e60c812a9a70ea65cb'
    const options: SignOptions = { subject: user.id, expiresIn: '1d' }

    const authenticateTokenReturn: AuthenticateResponse = {
      token: sign(payload, privateKey, options),
      user: {
        name: user.name,
        username,
        email
      }
    }

    return authenticateTokenReturn
  }
}

export default AuthenticateUserService
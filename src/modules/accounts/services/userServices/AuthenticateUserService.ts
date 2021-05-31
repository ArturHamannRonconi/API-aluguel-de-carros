import 'reflect-metadata'
import { compare } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { SignOptions, Secret, sign } from 'jsonwebtoken'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserAccount from '@myTypes/UserAccount'
import Payload from '@myTypes/Payload'
import AuthenticateResponse from '@myTypes/AuthenticateReponse'
import AppError from '@shared/errors/AppError'

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


    return { token: sign(payload, privateKey, options) }
  }
}

export default AuthenticateUserService
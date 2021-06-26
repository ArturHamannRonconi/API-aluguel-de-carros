import { inject, injectable } from 'tsyringe'
import { genSalt, hash } from 'bcrypt'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import IUserToken from '@accounts/entities/interfaces/IUserToken'
import NewPassword from '@myTypes/NewPassword'
import AppError from '@shared/errors/AppError'

@injectable()
class ResetPasswordService
{
  constructor(
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute({ password, token }: NewPassword): Promise<void>
  {
    const recovery_token = await this.verifyTokenExists(token)
    this.verifyTokenExpiration(recovery_token.expires_date)
    
    Promise.all([
      this.changedPassword(
        recovery_token.user_id,
        password
      ),
      this.deleteToken(recovery_token.id)
    ])
  }

  private async verifyTokenExists(token: string): Promise<IUserToken>
  {
    const tokenExists = await this.userTokenRepository.findByToken(token)
    if(!tokenExists) throw new AppError('Token not found', 404)

    return tokenExists
  }

  private verifyTokenExpiration(expires_date: Date): void
  {
    const timeHasBeenExpired = this
      .dateProvider
      .verifyTimeHasBeenExpired(expires_date)

    if(timeHasBeenExpired)
      throw new AppError('Expired link', 404)
  }

  private async changedPassword(user_id: string, password: string): Promise<void>
  {
    const salt = await genSalt(10)
    const passwordHash = await hash(password, salt)

    await this.userRepository.update({
      user_id,
      add_info: {
        password: passwordHash
      }
    })
  }

  private async deleteToken(token_id: string): Promise<void>
  {
    await this.userTokenRepository.deleteById(token_id)
  }
}

export default ResetPasswordService
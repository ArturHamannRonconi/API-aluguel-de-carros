import { inject, injectable } from 'tsyringe'
import { v4 as generateUUID } from 'uuid'
import { resolve } from 'path'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import IUser from '@accounts/entities/interfaces/IUser'
import AppError from '@shared/errors/AppError'
import MailContent from '@myTypes/MailContent'

@injectable()
class SendForgotPasswordMailService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {  }

  public async execute(email: string): Promise<void>
  {
    const user = await this.verifyUserExists(email)
    const token = await this.getToken(user.id)
    const variables = this.getEmailVariables(user, token)
    const emailContent = this.getEmailContent()

    await this.mailProvider.sendMail(email, emailContent, variables)
  }

  private async verifyUserExists(email: string): Promise<IUser>
  {
    const user = await this.userRepository.findByEmail(email)
    if(!user) throw new AppError('User does not exists', 404)

    return user
  }

  private async getToken(user_id: string): Promise<string>
  {
    const token = generateUUID()
    await this.userTokenRepository.create({
      refresh_token: token,
      user_id,
      expires_date: this.dateProvider.addHours(3)
    })

    return token
  }

  private getEmailVariables(user: IUser, token: string)
  {
    return {
      name: user.name,
      link: `${process.env.BASE_URL}${process.env.FORGOT_PASSWORD_ROUTE}${token}`
    }
  }

  private getEmailContent(): MailContent
  {
    return {
      subject: 'Password recovery',
      template_path: resolve(
        __dirname, '..', '..',
        'views', 'emails',
        'forgotPassword.hbs'
      )
    }
  }
}

export default SendForgotPasswordMailService
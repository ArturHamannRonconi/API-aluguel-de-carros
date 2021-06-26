import UserRepositoryInMemory from '@accounts/repositories/in-memory/UserRepositoryInMemory'
import UserTokenRepositoryInMemory from '@accounts/repositories/in-memory/UserTokenRepositoryInMemory'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import SendForgotPasswordMailService from '@accounts/services/userServices/SendForgotPasswordMailService'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import MailProviderInMemory from '@shared/container/providers/in-memory/MailProviderInMemory'
import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider'
import AppError from '@shared/errors/AppError'

describe('Send forgot email', () => {
  let sendForgotPasswordMailService: SendForgotPasswordMailService
  let userTokenRepository: IUserTokenRepository
  let userRepository: IUserRepository
  let dateProvider: IDateProvider
  let mailProvider: IMailProvider

  const email = 'user@test.com'
  const emailDoesNotExists = 'any email does not exists'

  beforeAll(() => {
    userTokenRepository = new UserTokenRepositoryInMemory()
    userRepository = new UserRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      userRepository,
      userTokenRepository,
      dateProvider,
      mailProvider
    )
  })
  
  it('Should be able to send a forgot password email to user', async () => {
    const sendEmail = jest.spyOn(mailProvider, 'sendMail')
    await sendForgotPasswordMailService.execute(email)
    

    expect(sendEmail).toHaveBeenCalled()
  })

  it('Should be able to send a forgot password email to user', async () => {
    const createToken = jest.spyOn(userTokenRepository, 'create')
    await sendForgotPasswordMailService.execute(email)
    
    expect(createToken).toHaveBeenCalled()
  })

  it('Should not be able to send email if user does not exists', async () => {
    await expect(sendForgotPasswordMailService.execute(emailDoesNotExists))
      .rejects
      .toThrow(AppError)
    await expect(sendForgotPasswordMailService.execute(emailDoesNotExists))
      .rejects
      .toThrow('User does not exists')
  })

})
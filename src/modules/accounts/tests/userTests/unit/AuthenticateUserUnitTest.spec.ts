import AppError from '@shared/errors/AppError'
import UserRepositoryInMemory from '@accounts/repositories/in-memory/UserRepositoryInMemory'
import AuthenticateUserService from '@accounts/services/userServices/AuthenticateUserService'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import UserTokenRepositoryInMemory from '@accounts/repositories/in-memory/UserTokenRepositoryInMemory'

describe('Authenticate User', () => {
  let authenticateUserService: AuthenticateUserService
  let userRepository: UserRepositoryInMemory
  let dateProvider: IDateProvider
  let userTokenReposiotyr: IUserTokenRepository

  const user = {
    username: 'userTest',
    email: 'user@test.com',
    password: '123456789'
  }

  beforeAll(async () => {
    userRepository = new UserRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    userTokenReposiotyr = new UserTokenRepositoryInMemory()
    authenticateUserService = new AuthenticateUserService(
      userRepository,
      userTokenReposiotyr,
      dateProvider
    )
  })
  
  it('Should be able to authenticate an user', async () => {
    const result = await authenticateUserService.execute(user)
    expect(result).toHaveProperty('token')
  })
  
  it('Should not be able authenticate when email is incorrect', async () => {
    const userWithInvalidEmail = {
      ...user,
      email: user.email
        .split('')
        .reverse()
        .join('')
    } 

    await expect(() => authenticateUserService.execute(userWithInvalidEmail))
      .rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(() => authenticateUserService.execute(userWithInvalidEmail))
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('Should not be able authenticate when username is incorrect', async () => {
    const userWithInvalidUsername = {
      ...user,
      username: user.username
        .split('')
        .reverse()
        .join('')
    } 

    await expect(() => authenticateUserService.execute(userWithInvalidUsername))
      .rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(() => authenticateUserService.execute(userWithInvalidUsername))
      .rejects
      .toBeInstanceOf(AppError)
  })

  it('Should not be able authenticate when password is incorrect', async () => {
    const userWithInvalidPassword = {
      ...user,
      password: user.password
        .split('')
        .reverse()
        .join('')
    } 

    await expect(() => authenticateUserService.execute(userWithInvalidPassword))
      .rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(() => authenticateUserService.execute(userWithInvalidPassword))
      .rejects
      .toBeInstanceOf(AppError)
  })
})
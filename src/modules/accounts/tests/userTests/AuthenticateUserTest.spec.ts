import AppError from '@shared/errors/AppError'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserRepositoryInMemory from '@accounts/repositories/in-memory/UserRepositoryInMemory'
import AuthenticateUserService from '@accounts/services/userServices/AuthenticateUserService'

describe('Authenticate User', () => {
  let authenticateUserService: AuthenticateUserService
  let userRepository: IUserRepository

  const user = {
    username: 'userTest',
    email: 'user@test.com',
    password: '123456789'
  }

  beforeAll(async () => {
    userRepository = new UserRepositoryInMemory()
    authenticateUserService = new AuthenticateUserService(userRepository)
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
import AppError from '@shared/errors/AppError'
import CreateUser from '@myTypes/CreateUser'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserRepositoryInMemory from '@accounts/repositories/in-memory/UserRepositoryInMemory'
import AuthenticateUserService from '@accounts/services/userServices/AuthenticateUserService'
import CreateUserService from '@accounts/services/userServices/CreateUserService'

let authenticateUserService: AuthenticateUserService
let userRepository: IUserRepository
let createUserService: CreateUserService

const user: CreateUser = {
  name: 'User Test',
  username: 'userTest',
  email: 'user@test.com',
  password: '123456789',
  driver_license: '000123'
}

describe('Authenticate User', () => {
  
  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory()
    authenticateUserService = new AuthenticateUserService(userRepository)
    createUserService = new CreateUserService(userRepository)
    await createUserService.execute(user)
  })
  
  it('Should be able to authenticate an user', async () => {
    const result = await authenticateUserService.execute({
      email: user.email,
      username: user.username,
      password: user.password
    })
    
    expect(result).toHaveProperty('token')
  })
  
  it('Should not be able authenticate when email is incorrect', async () => {
    const incorrectEmail = user.email.split('').reverse().join('')
    
    await expect(async () => {
      await authenticateUserService.execute({
        email: incorrectEmail,
        username: user.username,
        password: user.password
      })
    }).rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(async () => {
      await authenticateUserService.execute({
        email: incorrectEmail,
        username: user.username,
        password: user.password
      })
    }).rejects
      .toBeInstanceOf(AppError)

  })

  it('Should not be able authenticate when username is incorrect', async () => {
    const incorrectUsername = user.username.split('').reverse().join('')

    await expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        username: incorrectUsername,
        password: user.password
      })
    }).rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        username: incorrectUsername,
        password: user.password
      })
    }).rejects
      .toBeInstanceOf(AppError)
  })

  it('Should not be able authenticate when password is incorrect', async () => {
    const incorrectPassword = user.password.split('').reverse().join('') 

    await expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        username: user.username,
        password: incorrectPassword
      })
    }).rejects
      .toThrow('Email, username or password incorrect')
    
    await expect(async () => {
      await authenticateUserService.execute({
        email: user.email,
        username: user.username,
        password: incorrectPassword
      })
    }).rejects
      .toBeInstanceOf(AppError)
  })
})
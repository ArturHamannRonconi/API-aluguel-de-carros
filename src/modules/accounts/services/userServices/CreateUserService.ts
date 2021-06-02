import { hash, genSalt } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import CreateUser from '@myTypes/CreateUser'
import AppError from '@shared/errors/AppError'

@injectable()
class CreateUserService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(userData: CreateUser): Promise<void>
  {
    const [ emaiAlreadyExists, usernameAlreadyExists ] = await Promise.all([
      this.userRepository.findByEmail(userData.email),
      this.userRepository.findByUsername(userData.username)
    ])

    if(emaiAlreadyExists) throw new AppError('Email already registered')
    if(usernameAlreadyExists) throw new AppError('Username already exists')
    
    const salt = await genSalt(10)
    const password = await hash(userData.password, salt)

    await this.userRepository.create({ ...userData, password })
  }
}

export default CreateUserService
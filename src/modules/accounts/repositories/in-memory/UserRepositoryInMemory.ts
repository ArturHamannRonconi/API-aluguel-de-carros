import { v4 as generateUUID } from 'uuid'

import CreateUser from '@myTypes/CreateUser'
import UserAccount from '@myTypes/UserAccount'
import UserUpdate from '@myTypes/UserUpdate'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import User from '@accounts/entities/implementations/User'

class UserRepositoryInMemory implements IUserRepository
{
  private repository: User[]

  constructor()
  {
    this.repository = [
      Object.assign(new User(), {
        id: '32c4102c-acfe-458b-a508-cbb44f462679',
        name: 'User Test',
        email: 'user@test.com',
        username: 'userTest',
        password: '$2b$10$FjHLFbNbe2SdI4u.IX2xsuJCHlMzb97MqGcdxJtkDNS6zZ6fc0R4.',
        is_admin: false,
        driver_license: '000123',
        avatar: '',
        created_at: new Date
      }),
      Object.assign(new User(), {
        id: '19f0b083-2a8e-4791-8d0a-cb0d70cffc3d',
        name: 'Admin Test',
        email: 'admin@test.com',
        username: 'adminTest',
        password: '$2b$10$LwFS0RMeVcAy6HkURqkyq..TztoyC7oTYv5uO/7GjuqHLE.7VniDa',
        is_admin: true,
        driver_license: '123000',
        avatar: '',
        created_at: new Date
      }),
      Object.assign(new User(), {
        id: '2d2e9d13-bcf8-4d4c-a9f4-8ee848a9b4e4',
        name: 'User Test 2',
        email: 'user2@test.com',
        username: 'userTest2',
        password: '$2b$10$K0.o2e.wASTM2LXuTUo/oO1nhDA.M67rTcVkvZI9Q25y4wloI/lca',
        is_admin: false,
        driver_license: '153210',
        avatar: '',
        created_at: new Date
      })
    ]
  }

  public async create(userData: CreateUser): Promise<void>
  {
    const user = new User()

    Object.assign(user, {
      ...userData,
      id: generateUUID(),
      is_admin: false,
      avatar: null,
      created_at: new Date 
    })

    this.repository.push(user)
  }

  public async update({ user_id, add_info }: UserUpdate): Promise<void>
  {
    const user = this.findById(user_id)
    Object.assign(user, add_info)
  }
  
  public async findAll(): Promise<User[]>
  {
    return this.repository
  }
  
  public async findById(id: string): Promise<User>
  {
    return this.repository.find(user => user.id === id)
  }
  
  public async findByEmail(email: string): Promise<User>
  {
    return this.repository.find(user => user.email === email)
  }
  
  public async findByUsername(username: string): Promise<User>
  {
    return this.repository.find(user => user.username === username)
  }
  
  public async verifyEmailAndUsernameExists({ email, username }: Omit<UserAccount, 'password'>): Promise<User>
  {
    return this.repository.find(user => user.username === username && user.email === email)
  }
}

export default UserRepositoryInMemory
import request from 'supertest'
import { Connection } from 'typeorm'
import { hashSync } from 'bcrypt'

import app from '@shared/infra/http/app'
import Connect from '@shared/infra/database/typeorm'

describe('Create Category in database', () => {
  let connection: Connection
  let token: string

  const password = 'admin'
  const admin = {
    name: 'Admin',
    email: 'admin@mail.com',
    is_admin: true,
    password: hashSync(password, 10),
    username: 'admin',
    driver_license: '1315223312'
  }
  const category = {
    name: 'SUV',
    description: 'SUV car description'
  }
  const categoryAlreadyExists = {
    name: 'Sedan',
    description: 'Automóvel de 3 volumes'
  }

  beforeAll(async () => {
    connection = await Connect()

    await connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(admin)
      .execute()

    await connection
      .createQueryBuilder()
      .insert()
      .into('categories')
      .values(categoryAlreadyExists)
      .execute()
  })
  beforeEach(async () => {
    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: admin.email,
        username: admin.username,
        password: password
      })

    token = `Bearer ${response.body.token}`
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be Create a new category in database', async () => {
    await request(app)
      .post('/categories')
      .set({ Authorization: token })
      .send(category)
      .expect(201)
  })

  it('Should not be Create a new category with the same name', async () => {
    await request(app)
      .post('/categories')
      .set({ Authorization: token })
      .send(categoryAlreadyExists)
      .expect(400)
  })
})
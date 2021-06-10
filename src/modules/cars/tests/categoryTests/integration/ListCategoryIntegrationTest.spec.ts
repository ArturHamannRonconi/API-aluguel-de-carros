import request from 'supertest'
import { Connection } from 'typeorm'

import Connect from '@shared/infra/database/typeorm'
import app from '@shared/infra/http/app'

describe('List all categories', () => {
  let connection: Connection

  const category = {
    name: 'SUV',
    description: 'SUV car description'
  }

  beforeAll(async () => {
    connection = await Connect()

    await connection
      .createQueryBuilder()
      .insert()
      .into('categories')
      .values(category)
      .execute()
  })
  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should be able to list all categories', async () => {
    const response = await request(app)
      .get('/categories')
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('created_at')
  })
})
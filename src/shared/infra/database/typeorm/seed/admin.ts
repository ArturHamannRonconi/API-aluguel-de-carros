import { hash } from 'bcrypt'
import { getConnection } from 'typeorm'

import Connection from '../index'

async function create()
{
  const connection = await Connection()

  const password = await hash('admin', 10)

  await getConnection(connection.name)
    .query(
      `INSERT INTO users (
        name,
        email,
        avatar,
        is_admin,
        password,
        username,
        created_at,
        driver_license
      )
      VALUES (
        'Admin',
        'admin@mail.com',
        NULL,
        true,
        $1,
        'admin',
        NOW(),
        '1315223312'
      )`,
      [password]
    )
  
  await connection.close()
}

create()
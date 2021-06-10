import { Connection, createConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {
  const connectionOptions = await getConnectionOptions()

  if(process.env.NODE_ENV === 'test')
    Object.assign(connectionOptions, {
      host: 'localhost',
      database: 'rentx_test',
      port: 5433
    })

  return await createConnection(connectionOptions)
}
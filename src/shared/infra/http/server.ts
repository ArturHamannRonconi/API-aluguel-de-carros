import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import Connection from'@shared/infra/database/typeorm'
import '@shared/container'
import routes from '@shared/infra/http/routes'
import swaggerFile from '@docs/swagger.json'
import errorHandler from '@shared/errors/ErrorHandler'

Connection()
const app = express()

app.use(express.json())
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errorHandler.handle)

app.listen(3333, () => console.log('Server is running...'))
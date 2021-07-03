import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '@shared/container'
import routes from '@shared/infra/http/routes'
import swaggerFile from '@docs/swagger.json'
import errorHandler from '@shared/errors/ErrorHandler'

const app = express()

app.use(express.json())
app.use(express.static('tmp'))
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errorHandler.handle)


export default app
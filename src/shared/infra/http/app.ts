import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import '@shared/container'
import routes from '@shared/infra/http/routes'
import swaggerFile from '@docs/swagger.json'
import errorHandler from '@shared/errors/ErrorHandler'
import rateLimiter from '@shared/infra/http/middlewares/RateLimiter'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('tmp'))
app.use((req, res, next) => rateLimiter.exec(req, res, next))
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errorHandler.handle)


export default app
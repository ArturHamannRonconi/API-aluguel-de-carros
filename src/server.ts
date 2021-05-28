import express from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'

import './database'
import './shared/container'
import routes from './routes'
import swaggerFile from './swagger.json'
import errorHandler from './errors/ErrorHandler'

const app = express()

app.use(express.json())
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)
app.use(errorHandler.handle)

app.listen(3333, () => console.log('Server is running...'))
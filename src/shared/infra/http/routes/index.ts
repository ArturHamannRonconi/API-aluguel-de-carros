import { Router } from 'express'

import specificationsRoutes from './specifications.routes'
import categoriesRoutes from './categories.routes'
import usersRoutes from './users.routes'
import carsRoutes from './cars.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/cars', carsRoutes)

export default routes

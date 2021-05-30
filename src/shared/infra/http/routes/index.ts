import { Router } from 'express'

import categoriesRoutes from './categories.routes'
import specificationsRoutes from './specifications.routes'
import usersRoutes from './users.routes'

const routes = Router()

routes.use(categoriesRoutes)
routes.use(specificationsRoutes)
routes.use(usersRoutes)

export default routes

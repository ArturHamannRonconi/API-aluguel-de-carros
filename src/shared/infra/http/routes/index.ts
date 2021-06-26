import { Router } from 'express'

import specificationsRoutes from './specifications.routes'
import categoriesRoutes from './categories.routes'
import usersRoutes from './users.routes'
import carsRoutes from './cars.routes'
import carImagesRoutes from './carImages.routes'
import rentalRoutes from './rental.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/cars', carsRoutes)
routes.use('/car-images', carImagesRoutes)
routes.use('/rentals', rentalRoutes)

export default routes

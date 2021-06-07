import { Router } from 'express'

import authenticationHandler from '../middlewares/AuthenticationHandler'
import createRentalController from '@rentals/controllers/rentalControllers/CreateRentalController'

const rentalRoutes = Router()

rentalRoutes.route('/:car_id')
  .post(
    authenticationHandler.exec,
    createRentalController.handle
  )

export default rentalRoutes
import { Router } from 'express'

import authenticationHandler from '../middlewares/AuthenticationHandler'
import createRentalController from '@rentals/controllers/rentalControllers/CreateRentalController'
import devolutionREntalController from '@rentals/controllers/rentalControllers/DevolutionRentalController'

const rentalRoutes = Router()

rentalRoutes.route('/devolution')
  .post(
    authenticationHandler.exec,
    devolutionREntalController.handle
  )

rentalRoutes.route('/:car_id')
  .post(
    authenticationHandler.exec,
    createRentalController.handle
  )

export default rentalRoutes
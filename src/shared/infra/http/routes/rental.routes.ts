import { Router } from 'express'

import authenticationHandler from '../middlewares/AuthenticationHandler'
import createRentalController from '@rentals/controllers/rentalControllers/CreateRentalController'
import devolutionREntalController from '@rentals/controllers/rentalControllers/DevolutionRentalController'
import listRentalByUserController from '@rentals/controllers/rentalControllers/ListRentalByUserConroller'

const rentalRoutes = Router()

rentalRoutes.route('/')
  .get(
    authenticationHandler.exec,
    listRentalByUserController.handle
  )

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
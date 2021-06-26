import { Router } from 'express'

import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import authorizationHandler from '@shared/infra/http/middlewares/AuthorizationHandler'
import createCarController from '@cars/controllers/carControllers/CreateCarController'
import listAvailableCarController from '@cars/controllers/carControllers/ListAvailableCarController'
import createCarSpecificationController from '@cars/controllers/carControllers/CreateCarSpecificationController'

const carsRoutes = Router()

carsRoutes.route('/')
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    createCarController.handle
  )
  
carsRoutes.route('/available')
  .get(listAvailableCarController.handle)

carsRoutes.route('/add-specifications/:car_id')
  .put(
    authenticationHandler.exec,
    authorizationHandler.exec,
    createCarSpecificationController.handle
  )

export default carsRoutes
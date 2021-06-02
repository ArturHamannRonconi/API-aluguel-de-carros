import { Router } from 'express'

import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import authorizationHandler from '@shared/infra/http/middlewares/AuthorizationHandler'
import createCarController from '@cars/controllers/carControllers/CreateCarController'

const carsRoutes = Router()

carsRoutes.route('/')
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    createCarController.handle
  )

export default carsRoutes
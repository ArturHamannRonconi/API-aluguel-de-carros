import { Router } from 'express'

import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import authorizationHandler from '@shared/infra/http/middlewares/AuthorizationHandler'
import listSpecificationController from '@cars/controllers/specificationControllers/ListSpecificationController'
import createSpecificationController from '@cars/controllers/specificationControllers/CreateSpecificationController'

const specificationsRoutes = Router()

specificationsRoutes.route('/')
  .get(listSpecificationController.handle)
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    createSpecificationController.handle
  )

export default specificationsRoutes
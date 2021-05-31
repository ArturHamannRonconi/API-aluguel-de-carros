import { Router } from 'express'

import ListSpecificationController from '@cars/controllers/specificationControllers/ListSpecificationController'
import CreateSpecificationController from '@cars/controllers/specificationControllers/CreateSpecificationController'

const specificationsRoutes = Router()

const listSpecificationController = new ListSpecificationController()
const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.route('/specifications')
  .get(listSpecificationController.handle)
  .post(createSpecificationController.handle)

export default specificationsRoutes
import { Router } from 'express'

import {
  listSpecificationController,
  createSpecificationController
} from '../modules/cars/controllers/specificationControllers'

const specificationsRoutes = Router()

specificationsRoutes.route('/specifications')
  .get(listSpecificationController.execute.bind(listSpecificationController))
  .post(createSpecificationController.execute.bind(createSpecificationController))

export default specificationsRoutes
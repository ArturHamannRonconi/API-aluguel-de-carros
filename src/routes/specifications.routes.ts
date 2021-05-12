import { Router } from 'express'

import {
  listSpecificationController,
  createSpecificationController
} from '../modules/cars/controllers/specificationControllers'

const specificationsRoutes = Router()

specificationsRoutes.route('/specifications')
  .get(listSpecificationController.execute)
  .post(createSpecificationController.execute)

export default specificationsRoutes
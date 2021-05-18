import { Router } from 'express'

import {
  listSpecificationController,
  createSpecificationController
} from '../modules/cars/controllers/specificationControllers'

const specificationsRoutes = Router()

specificationsRoutes.route('/specifications')
  .get((req, res) => listSpecificationController.handle(req, res))
  .post((req, res) => createSpecificationController.handle(req, res))

export default specificationsRoutes
import { Router } from 'express'

import specificationControllers from '../modules/cars/controllers/specificationControllers'

const specificationsRoutes = Router()

specificationsRoutes.route('/specifications')
  .get((req, res) =>
    specificationControllers()
      .listSpecificationController.handle(req, res)
  )
  .post((req, res) =>
    specificationControllers()
      .createSpecificationController.handle(req, res)
  )

export default specificationsRoutes
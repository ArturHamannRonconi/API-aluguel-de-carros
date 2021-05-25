import multer from 'multer'
import { Router } from 'express'

import categoryControllers from '../modules/cars/controllers/categoryControllers'

const categoriesRoutes = Router()
const upload = multer({ dest: './tmp' })

categoriesRoutes.route('/categories')
  .get((req, res) => 
    categoryControllers()
      .listCategoryController.handle(req, res)
  )
  .post((req, res) =>
    categoryControllers()
      .createCategoryController.handle(req, res)
  )

categoriesRoutes.route('/categories/import')
  .post(upload.single('file'), (req, res) =>
    categoryControllers()
      .importCategoryController.handle(req, res)
  )

export default categoriesRoutes
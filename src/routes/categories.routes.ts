import multer from 'multer'
import { Router } from 'express'

import {
  listCategoryController,
  createCategoryController,
  importCategoryController
} from '../modules/cars/controllers/categoryControllers'

const categoriesRoutes = Router()
const upload = multer({ dest: './tmp' })

categoriesRoutes.route('/categories')
  .get((req, res) => listCategoryController.handle(req, res))
  .post((req, res) => createCategoryController.handle(req, res))

categoriesRoutes.route('/categories/import')
  .post(upload.single('file'), (req, res) => importCategoryController.handle(req, res))

export default categoriesRoutes
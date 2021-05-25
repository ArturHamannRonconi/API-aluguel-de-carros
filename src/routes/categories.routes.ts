import multer from 'multer'
import { Router } from 'express'

import ListCategoryController from '../modules/cars/controllers/categoryControllers/ListCategoryController'
import CreateCategoryControllers from '../modules/cars/controllers/categoryControllers/CreateCategoryController'
import ImportCategoryController from '../modules/cars/controllers/categoryControllers/ImportCategoryController'

const categoriesRoutes = Router()
const upload = multer({ dest: './tmp' })

const listCategoryController = new ListCategoryController()
const createCategoryControllers = new CreateCategoryControllers()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.route('/categories')
  .get(listCategoryController.handle)
  .post(createCategoryControllers.handle)

categoriesRoutes.route('/categories/import')
  .post(upload.single('file'), importCategoryController.handle)

export default categoriesRoutes
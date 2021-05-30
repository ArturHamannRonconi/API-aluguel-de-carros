import multer from 'multer'
import { Router } from 'express'

import ListCategoryController from '@cars/controllers/categoryControllers/ListCategoryController'
import CreateCategoryControllers from '@cars/controllers/categoryControllers/CreateCategoryController'
import ImportCategoryController from '@cars/controllers/categoryControllers/ImportCategoryController'
import uploadConfig from '@config/UploadConfig'

const categoriesRoutes = Router()
const uploadCsvCategories = multer(uploadConfig.options('tmp'))

const listCategoryController = new ListCategoryController()
const createCategoryControllers = new CreateCategoryControllers()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.route('/categories')
  .get(listCategoryController.handle)
  .post(createCategoryControllers.handle)

categoriesRoutes.route('/categories/import')
  .post(uploadCsvCategories.single('file'), importCategoryController.handle)

export default categoriesRoutes
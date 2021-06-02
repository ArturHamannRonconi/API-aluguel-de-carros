import multer from 'multer'
import { Router } from 'express'

import authenticationHandler from '@shared/infra/http/middlewares/AuthenticationHandler'
import authorizationHandler from '@shared/infra/http/middlewares/AuthorizationHandler'
import listCategoryController from '@cars/controllers/categoryControllers/ListCategoryController'
import createCategoryControllers from '@cars/controllers/categoryControllers/CreateCategoryController'
import importCategoryController from '@cars/controllers/categoryControllers/ImportCategoryController'
import uploadConfig from '@config/UploadConfig'

const categoriesRoutes = Router()
const uploadCsvCategories = multer(uploadConfig.options('tmp'))

categoriesRoutes.route('/')
  .get(listCategoryController.handle)
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    createCategoryControllers.handle
  )

categoriesRoutes.route('/import')
  .post(
    authenticationHandler.exec,
    authorizationHandler.exec,
    uploadCsvCategories.single('file'),
    importCategoryController.handle
  )

export default categoriesRoutes
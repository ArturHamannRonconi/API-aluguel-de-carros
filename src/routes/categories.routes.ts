import { Router } from 'express'

import {
  listCategoryController,
  createCategoryController
} from '../modules/cars/controllers/categoryControllers'

const categoriesRoutes = Router()

categoriesRoutes.route('/categories')
  .get(listCategoryController.execute.bind(listCategoryController))
  .post(createCategoryController.execute.bind(createCategoryController))
  
export default categoriesRoutes
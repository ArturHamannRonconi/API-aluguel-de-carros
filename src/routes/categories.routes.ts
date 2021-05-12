import { Router } from 'express'

import {
  listCategoryController,
  createCategoryController
} from '../modules/cars/controllers/categoryControllers'

const categoriesRoutes = Router()

categoriesRoutes.route('/categories')
  .get(listCategoryController.execute)
  .post(createCategoryController.execute)
  
export default categoriesRoutes
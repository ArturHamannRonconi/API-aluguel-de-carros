import { Router } from 'express'

import categoryController from '../controllers/CategoryController'

const categoriesRoutes = Router()

categoriesRoutes.route('/categories')
  .post(categoryController.create)

export default categoriesRoutes
import { listCategoryService, createCategoryService } from '../../services/categoryServices'

import ListCategoryController from './ListCategoryController'
import CreateCategoryController from './CreateCategoryController'

const listCategoryController = new ListCategoryController(listCategoryService)
const createCategoryController = new CreateCategoryController(createCategoryService)

export { listCategoryController, createCategoryController }
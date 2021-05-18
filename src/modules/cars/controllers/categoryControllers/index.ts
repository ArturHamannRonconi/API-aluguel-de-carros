import {
  listCategoryService,
  createCategoryService,
  importCategoryService
} from '../../services/categoryServices'

import ListCategoryController from './ListCategoryController'
import CreateCategoryController from './CreateCategoryController'
import ImportCategoryController from './ImportCategoryController'

const listCategoryController = new ListCategoryController(listCategoryService)
const createCategoryController = new CreateCategoryController(createCategoryService)
const importCategoryController = new ImportCategoryController(importCategoryService)

export { listCategoryController, createCategoryController, importCategoryController }
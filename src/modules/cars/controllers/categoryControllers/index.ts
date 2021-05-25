import categoryServices from '../../services/categoryServices'

import ListCategoryController from './ListCategoryController'
import CreateCategoryController from './CreateCategoryController'
import ImportCategoryController from './ImportCategoryController'

export default () => {

  const listCategoryController = new ListCategoryController(
    categoryServices().listCategoryService
  )
  const createCategoryController = new CreateCategoryController(
    categoryServices().createCategoryService
  )
  const importCategoryController = new ImportCategoryController(
    categoryServices().importCategoryService
  )
  
  return { listCategoryController, createCategoryController, importCategoryController }
}
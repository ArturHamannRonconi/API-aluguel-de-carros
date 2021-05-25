import CategoryRepository from '../../repositories/CategoryRepository'
import ListCategoryService from './ListCategoryService'
import CreateCategoryService from './CreateCategoryService'
import ImportCategoryService from './ImportCategoryService'

export default () => {
  const categoryRepository = new CategoryRepository()
  
  const listCategoryService = new ListCategoryService(categoryRepository) 
  const createCategoryService = new CreateCategoryService(categoryRepository) 
  const importCategoryService = new ImportCategoryService(categoryRepository)

  return { listCategoryService, createCategoryService, importCategoryService }
}

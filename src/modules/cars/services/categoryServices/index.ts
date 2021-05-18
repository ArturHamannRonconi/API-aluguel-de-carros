import CategoryRepository from '../../repositories/CategoryRepository'
import ListCategoryService from './ListCategoryService'
import CreateCategoryService from './CreateCategoryService'
import ImportCategoryService from './ImportCategoryService'

const categoryRepository = CategoryRepository.getInstance()

const listCategoryService = new ListCategoryService(categoryRepository) 
const createCategoryService = new CreateCategoryService(categoryRepository) 
const importCategoryService = new ImportCategoryService(categoryRepository)

export { listCategoryService, createCategoryService, importCategoryService }
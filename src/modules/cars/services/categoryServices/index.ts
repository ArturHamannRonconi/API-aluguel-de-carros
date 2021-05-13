import CategoryRepository from '../../repositories/CategoryRepository'
import ListCategoryService from './ListCategoryService'
import CreateCategoryService from './CreateCategoryService'

const categoryRepository = CategoryRepository.getInstance()

const listCategoryService = new ListCategoryService(categoryRepository) 
const createCategoryService = new CreateCategoryService(categoryRepository) 

export { listCategoryService, createCategoryService }
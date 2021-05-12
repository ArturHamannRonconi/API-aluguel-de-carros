import CategoryRepository from '../../repositories/CategoryRepository'
import CreateCategoryService from '../../services/CreateCategoryServices'

import ListCategoryController from './ListCategoryController'
import CreateCategoryController from './CreateCategoryController'

const categoryRepository = new CategoryRepository()
const createCategoryService = new CreateCategoryService(categoryRepository)

console.log(categoryRepository)

const listCategoryController = new ListCategoryController(categoryRepository)
const createCategoryController = new CreateCategoryController(createCategoryService)

export { listCategoryController, createCategoryController }
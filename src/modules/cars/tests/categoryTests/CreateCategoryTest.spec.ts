import AppError from '@shared/errors/AppError'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import Category from '@cars/infra/typeorm/entities/Category'
import CategoryRepositoryInMemory from '@cars/repositories/in-memory/CategoryRepositoryInMemory'
import CreateCategoryService from '@cars/services/categoryServices/CreateCategoryService'


let categoryRepository: ICategoryRepository
let createCategoryService: CreateCategoryService

const name = 'New Category'
const description = 'This is a new category description'

describe('Create Category', () => {  
  beforeEach(() => {
    categoryRepository = new CategoryRepositoryInMemory()
    createCategoryService = new CreateCategoryService(categoryRepository)
  })
  
  it('Should be able to create a new category', async () => {
    await createCategoryService.execute({ name, description })
    const category = await categoryRepository.findByName(name)
    
    expect(category).toHaveProperty('id')
    expect(category).toHaveProperty('name', name)
    expect(category).toHaveProperty('description', description)
    expect(category).toHaveProperty('created_at')
    expect(category).toBeInstanceOf(Category)
  })
  
  it('Should not be able to create a new category with a name exists', async () => {
    await createCategoryService.execute({ name, description })
    
    await expect(async () => await createCategoryService.execute({ name, description }))
      .rejects
      .toThrow('Category already exists')
      
    await expect(async () => await createCategoryService.execute({ name, description }))
      .rejects
      .toBeInstanceOf(AppError)
  })
})


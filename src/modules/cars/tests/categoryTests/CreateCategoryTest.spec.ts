import AppError from '@shared/errors/AppError'
import CategoryInMemory from '@cars/entities/in-memory/CategoryInMemory'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepositoryInMemory from '@cars/repositories/in-memory/CategoryRepositoryInMemory'
import CreateCategoryService from '@cars/services/categoryServices/CreateCategoryService'

let categoryRepositoryInMemory: ICategoryRepository
let createCategoryService: CreateCategoryService

describe('Create Category', () => {
  const name = 'New Category'
  const description = 'This is a new category description'
  
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryService = new CreateCategoryService(categoryRepositoryInMemory)
  })
  
  it('Should be able to create a new category', async () => {
    await createCategoryService.execute({ name, description })
    const category = await categoryRepositoryInMemory.findByName(name)
    
    expect(category).toHaveProperty('id')
    expect(category).toHaveProperty('name', name)
    expect(category).toHaveProperty('description', description)
    expect(category).toHaveProperty('created_at')
    expect(category).toBeInstanceOf(CategoryInMemory)
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


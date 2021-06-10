import AppError from '@shared/errors/AppError'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepositoryInMemory from '@cars/repositories/in-memory/CategoryRepositoryInMemory'
import CreateCategoryService from '@cars/services/categoryServices/CreateCategoryService'



describe('Create Category', () => {  
  let categoryRepository: ICategoryRepository
  let createCategoryService: CreateCategoryService
  
  const name = 'New Category'
  const description = 'This is a new category description'
  
  beforeAll(() => {
    categoryRepository = new CategoryRepositoryInMemory()
    createCategoryService = new CreateCategoryService(categoryRepository)
  })
  
  it('Should be able to create a new category', async () => {
    await createCategoryService.execute({ name, description })
    const category = await categoryRepository.findByName(name)
    
    expect(category).toHaveProperty('id')
  })
  
  it('Should not be able to create a new category with a name exists', async () => {
    await expect(() => createCategoryService.execute({ name: 'SUV', description }))
      .rejects
      .toThrow('Category already exists')
      
    await expect(() => createCategoryService.execute({ name: 'SUV', description }))
      .rejects
      .toBeInstanceOf(AppError)
  })
})


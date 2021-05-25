import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'
import CreateCategory from '../../@types/CreateCategory'

class CreateCategoryServices
{
  constructor(private categoryRepository: ICategoryRepository) {  }

  public async execute({ name, description }: CreateCategory): Promise<void>
  {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name)
    if(categoryAlreadyExists) throw new Error('400/Category already exists')  

    await this.categoryRepository.create({ name, description })
  }
}

export default CreateCategoryServices
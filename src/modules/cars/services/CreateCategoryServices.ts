import ICategoryRepository from '../interfaces/ICategoryRepository'
import CreateCategory from '../@types/CreateCategory'

class CreateCategoryServices
{
  constructor(private categoryRepository: ICategoryRepository) {  }

  execute({ name, description }: CreateCategory): void
  {
    const categoryAlreadyExists = this.categoryRepository.findByName(name)
    if(categoryAlreadyExists) throw new Error('400/Category already exists')  

    this.categoryRepository.create({ name, description })
  }

}

export default CreateCategoryServices
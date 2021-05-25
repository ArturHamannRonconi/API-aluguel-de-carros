import Category from '../../entities/Category'
import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'

class ListCategoryService
{
  constructor(private categoryRepository: ICategoryRepository) {  }

  public async execute(): Promise<Category[]>
  {
    return await this.categoryRepository.list()
  }
}

export default ListCategoryService
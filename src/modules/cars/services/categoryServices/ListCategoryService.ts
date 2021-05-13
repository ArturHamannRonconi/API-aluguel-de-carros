import Category from '../../models/Category'
import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'

class ListCategoryService
{
  constructor(private categoryRepository: ICategoryRepository) {  }

  public execute(): Category[]
  {
    return this.categoryRepository.list()
  }
}

export default ListCategoryService
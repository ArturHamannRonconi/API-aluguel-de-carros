import { inject, injectable } from 'tsyringe'

import Category from '../../entities/Category'
import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'

@injectable()
class ListCategoryService
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {  }

  public async execute(): Promise<Category[]>
  {
    return await this.categoryRepository.list()
  }
}

export default ListCategoryService
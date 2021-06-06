import { inject, injectable } from 'tsyringe'

import ICategory from '@cars/entities/interfaces/ICategory'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'

@injectable()
class ListCategoryService
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {  }

  public async execute(): Promise<ICategory[]>
  {
    return await this.categoryRepository.findAll()
  }
}

export default ListCategoryService
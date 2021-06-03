import { inject, injectable } from 'tsyringe'

import ICategory from '@cars/entities/interfaces/ICategory'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class FindCategoryService
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {  }

  public async execute(id: string): Promise<ICategory>
  {
    const category = await this.categoryRepository.findById(id)
    
    if(!category) throw new AppError('Category not found', 404)

    return category
  }
}

export default FindCategoryService
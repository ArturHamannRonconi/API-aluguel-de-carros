import { inject, injectable } from 'tsyringe'

import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'
import CreateCategory from '../../@types/CreateCategory'
import AppError from '../../../../errors/AppError'

@injectable()
class CreateCategoryServices
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {  }

  public async execute({ name, description }: CreateCategory): Promise<void>
  {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name)
    if(categoryAlreadyExists) throw new AppError('Category already exists')  

    await this.categoryRepository.create({ name, description })
  }
}

export default CreateCategoryServices
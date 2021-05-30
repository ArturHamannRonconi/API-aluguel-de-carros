import { getRepository, Repository } from 'typeorm'

import ICategory from '@cars/entities/interfaces/ICategory'
import Category from '@cars/infra/typeorm/entities/Category'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CreateCategory from '@myTypes/CreateCategory'

class CategoryRepository implements ICategoryRepository
{
  private repository: Repository<ICategory>

  constructor()
  {
    this.repository = getRepository(Category)
  }

  public async create({ name, description }: CreateCategory): Promise<void>
  {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
  }

  public async list(): Promise<ICategory[]>
  {
    const categories = await this.repository.find()
    return categories
  }

  public async findByName(name: string): Promise<ICategory>
  {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export default CategoryRepository
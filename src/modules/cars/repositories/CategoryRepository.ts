import { getRepository, Repository } from 'typeorm'

import Category from '../entities/Category'
import ICategoryRepository from './interfaces/ICategoryRepository'
import CreateCategory from '../@types/CreateCategory'

class CategoryRepository implements ICategoryRepository
{
  private repository: Repository<Category>

  constructor()
  {
    this.repository = getRepository(Category)
  }

  public async create({ name, description }: CreateCategory): Promise<void>
  {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
  }

  public async list(): Promise<Category[]>
  {
    const categories = await this.repository.find()
    return categories
  }

  public async findByName(name: string): Promise<Category>
  {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export default CategoryRepository
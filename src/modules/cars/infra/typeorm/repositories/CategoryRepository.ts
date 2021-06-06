import { getRepository, Repository } from 'typeorm'

import CategoryTypeOrm from '@cars/infra/typeorm/entities/CategoryTypeOrm'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CreateCategory from '@myTypes/CreateCategory'

class CategoryRepository implements ICategoryRepository
{
  private repository: Repository<CategoryTypeOrm>

  constructor()
  {
    this.repository = getRepository(CategoryTypeOrm)
  }

  public async create({ name, description }: CreateCategory): Promise<void>
  {
    const category = this.repository.create({ name, description })
    await this.repository.save(category)
  }

  public async findAll(): Promise<CategoryTypeOrm[]>
  {
    return await this.repository.find()
  }

  public async findByName(name: string): Promise<CategoryTypeOrm>
  {
    return await this.repository.findOne({ name })
  }

  public async findById(id: string): Promise<CategoryTypeOrm>
  {
    return await this.repository.findOne(id)
  }
}

export default CategoryRepository
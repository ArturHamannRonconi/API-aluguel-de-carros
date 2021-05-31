import { v4 as generateUUID } from 'uuid'

import CreateCategory from '@myTypes/CreateCategory'
import ICategory from '@cars/entities/ICategory'
import ICategoryRepository from '../interfaces/ICategoryRepository'
import Category from '@cars/infra/typeorm/entities/Category'

class CategoryRepositoryInMemory implements ICategoryRepository
{
  private categories: ICategory[]

  constructor()
  {
    this.categories = []
  }

  public async create({ name, description }: CreateCategory): Promise<void>
  {
    const category = new Category()
    
    Object.assign(category, {
      id: generateUUID(),
      created_at: new Date,
      description,
      name
    })

    this.categories.push(category)
  }

  public async list(): Promise<ICategory[]>
  {
    return this.categories
  }

  public async findByName(name: string): Promise<ICategory>
  {
    return this.categories.find(category => category.name === name)
  }
}

export default CategoryRepositoryInMemory
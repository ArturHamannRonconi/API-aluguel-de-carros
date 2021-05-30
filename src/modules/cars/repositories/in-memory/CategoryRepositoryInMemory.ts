import { v4 as generateUUID } from 'uuid'

import CreateCategory from '@myTypes/CreateCategory'
import CategoryInMemory from '@cars/entities/in-memory/CategoryInMemory'
import ICategory from '@cars/entities/interfaces/ICategory'
import ICategoryRepository from '../interfaces/ICategoryRepository'

class CategoryRepositoryInMemory implements ICategoryRepository
{
  private categories: ICategory[]

  constructor()
  {
    this.categories = []
  }

  public async create({ name, description }: CreateCategory): Promise<void>
  {
    const category = new CategoryInMemory()
    
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
    const category = this.categories.find(category => category.name === name)
    return category
  }
}

export default CategoryRepositoryInMemory
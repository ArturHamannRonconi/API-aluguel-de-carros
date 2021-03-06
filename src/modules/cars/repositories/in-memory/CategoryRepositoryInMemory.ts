import { v4 as generateUUID } from 'uuid'

import CreateCategory from '@myTypes/CreateCategory'
import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import Category from '@cars/entities/implementations/Category'

class CategoryRepositoryInMemory implements ICategoryRepository
{
  private categories: Category[]

  constructor()
  {
    this.categories = [
      Object.assign(new Category(), {
        id: '3de39bd1-0d5c-46c1-ace1-394aa5db369e',
        name: 'SUV',
        description: 'Utilitario esportivo',
        created_at: new Date
      }),
      Object.assign(new Category(), {
        id: 'b17af4e0-c2c3-4003-af17-6df6e2928ee8',
        name: 'Sedan',
        description: 'Automovel de 3 volumes',
        created_at: new Date
      })
    ]
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

  public async findAll(): Promise<Category[]>
  {
    return this.categories
  }

  public async findByName(name: string): Promise<Category>
  {
    return this.categories.find(category => category.name === name)
  }
  
  public async findById(id: string): Promise<Category>
  {
    return this.categories.find(category => category.id === id)
  }
}

export default CategoryRepositoryInMemory
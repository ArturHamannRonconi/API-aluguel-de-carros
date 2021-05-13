import Category from '../models/Category'
import ICategoryRepository from './interfaces/ICategoryRepository'
import CreateCategory from '../@types/CreateCategory'

class CategoryRepository implements ICategoryRepository
{
  private categories: Category[]
  private static INSTANCE: CategoryRepository

  private constructor()
  {
    this.categories = []
  }

  public create({ name, description }: CreateCategory): void
  {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  public list(): Category[]
  {
    return this.categories
  }

  public findByName(name: string): Category
  {
    const category = this.categories.find(category => category.name === name)

    return category
  }

  public static getInstance(): CategoryRepository
  {
    if(!CategoryRepository.INSTANCE)
      CategoryRepository.INSTANCE = new CategoryRepository()
     
    return CategoryRepository.INSTANCE
  }
}

export default CategoryRepository
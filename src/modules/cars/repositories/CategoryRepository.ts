import Category from '../models/Category'
import ICategoryRepository from '../interfaces/ICategoryRepository'
import CreateCategory from '../@types/CreateCategory'

class CategoryRepository implements ICategoryRepository
{
  private categories: Category[]

  constructor()
  {
    this.categories = []
  }

  create({ name, description }: CreateCategory): void
  {
    const category = new Category()
    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    })

    this.categories.push(category)
  }

  list(): Category[]
  {
    return this.categories
  }

  findByName(name: string): Category
  {
    const category = this.categories.find(category => category.name === name)

    return category
  }

}

export default CategoryRepository
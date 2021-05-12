import Category from '../models/Category'
import CreateCategory from '../@types/CreateCategory'

interface ICategoryRepository
{
  create({ name, description }: CreateCategory): void
  list(): Category[]
  findByName(name: string): Category
}

export default ICategoryRepository
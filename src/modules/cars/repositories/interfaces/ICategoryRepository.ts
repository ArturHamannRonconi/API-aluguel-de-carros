import Category from '../../entities/Category'
import CreateCategory from '../../@types/CreateCategory'

interface ICategoryRepository
{
  create({ name, description }: CreateCategory): Promise<void>
  list(): Promise<Category[]>
  findByName(name: string): Promise<Category>
}

export default ICategoryRepository
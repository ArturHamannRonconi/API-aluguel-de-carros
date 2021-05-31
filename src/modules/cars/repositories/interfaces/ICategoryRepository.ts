import ICategory from '@cars/entities/ICategory'
import CreateCategory from '@myTypes/CreateCategory'

interface ICategoryRepository
{
  create({ name, description }: CreateCategory): Promise<void>
  list(): Promise<ICategory[]>
  findByName(name: string): Promise<ICategory>
}

export default ICategoryRepository
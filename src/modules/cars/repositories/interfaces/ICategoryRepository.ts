import ICategory from '@cars/entities/interfaces/ICategory'
import CreateCategory from '@myTypes/CreateCategory'

interface ICategoryRepository
{
  create({ name, description }: CreateCategory): Promise<void>
  findAll(): Promise<ICategory[]>
  findByName(name: string): Promise<ICategory>
  findById(id: string): Promise<ICategory>
}

export default ICategoryRepository
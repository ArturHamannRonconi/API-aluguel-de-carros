import ISpecification from '@cars/entities/interfaces/ISpecification'
import CreateSpecification from '@myTypes/CreateSpecification'

interface ISpecificationRepository
{
  create({ name, description }: CreateSpecification): Promise<void>
  findAll(): Promise<ISpecification[]>
  findByName(name: string): Promise<ISpecification>
  findByIds(specifications: string[]): Promise<ISpecification[]>
}

export default ISpecificationRepository
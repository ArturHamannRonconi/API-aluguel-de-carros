import ISpecification from '@cars/entities/ISpecification'
import CreateSpecification from '@myTypes/CreateSpecification'

interface ISpecificationRepository
{
  create({ name, description }: CreateSpecification): Promise<void>
  list(): Promise<ISpecification[]>
  findByName(name: string): Promise<ISpecification>
}

export default ISpecificationRepository
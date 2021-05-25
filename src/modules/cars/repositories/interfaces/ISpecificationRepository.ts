import CreateSpecification from '../../@types/CreateSpecification'
import Specification from '../../entities/Specification'

interface ISpecificationRepository
{
  create({ name, description }: CreateSpecification): Promise<void>
  list(): Promise<Specification[]>
  findByName(name: string): Promise<Specification>
}

export default ISpecificationRepository
import CreateSpecification from '../@types/CreateSpecification'
import Specification from '../models/Specification'

interface ISpecificationRepository
{
  create({ name, description }: CreateSpecification): void
  findByName(name: string): Specification
  list(): Specification[]
}

export default ISpecificationRepository
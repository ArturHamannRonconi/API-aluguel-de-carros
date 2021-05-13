import Specification from '../models/Specification'
import ISpecificationRepository from './interfaces/ISpecificationRepository'
import CreateSpecification from '../@types/CreateSpecification'

class SpecificationRepository implements ISpecificationRepository
{
  private specifications: Specification[]
  private static INSTANCE: SpecificationRepository 

  private constructor()
  {
    this.specifications = []
  }

  public create({ name, description }: CreateSpecification): void
  {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })

    this.specifications.push(specification)
  }

  public list(): Specification[]
  {
    return this.specifications
  }

  public findByName(name: string): Specification
  {
    const specification = this.specifications.find(specification => specification.name === name)
    return specification
  }

  public static getInstance(): SpecificationRepository
  {
    if(!SpecificationRepository.INSTANCE)
      SpecificationRepository.INSTANCE = new SpecificationRepository()

    return SpecificationRepository.INSTANCE
  }
}

export default SpecificationRepository
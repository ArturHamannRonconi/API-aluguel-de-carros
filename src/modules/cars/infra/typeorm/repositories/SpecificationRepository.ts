import { getRepository, Repository } from 'typeorm'

import ISpecification from '@cars/entities/ISpecification'
import Specification from '@cars/infra/typeorm/entities/Specification'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '@myTypes/CreateSpecification'

class SpecificationRepository implements ISpecificationRepository
{
  private repository: Repository<ISpecification>

  constructor()
  {
    this.repository = getRepository(Specification)
  }

  public async create({ name, description }: CreateSpecification): Promise<void>
  {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

  public async list(): Promise<ISpecification[]>
  {
    const specifications = await this.repository.find()
    return specifications
  }

  public async findByName(name: string): Promise<ISpecification>
  {
    const specification = await this.repository.findOne({ name })
    return specification
  }
}

export default SpecificationRepository
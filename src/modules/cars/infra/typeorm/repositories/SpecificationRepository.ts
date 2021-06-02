import { getRepository, Repository } from 'typeorm'

import SpecificationTypeOrm from '@cars/infra/typeorm/entities/SpecificationTypeOrm'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '@myTypes/CreateSpecification'

class SpecificationRepository implements ISpecificationRepository
{
  private repository: Repository<SpecificationTypeOrm>

  constructor()
  {
    this.repository = getRepository(SpecificationTypeOrm)
  }

  public async create({ name, description }: CreateSpecification): Promise<void>
  {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

  public async list(): Promise<SpecificationTypeOrm[]>
  {
    const specifications = await this.repository.find()
    return specifications
  }

  public async findByName(name: string): Promise<SpecificationTypeOrm>
  {
    const specification = await this.repository.findOne({ name })
    return specification
  }
}

export default SpecificationRepository
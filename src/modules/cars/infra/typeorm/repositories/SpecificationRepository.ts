import { getRepository, Repository } from 'typeorm'

import SpecificationTypeOrm from '@cars/infra/typeorm/entities/SpecificationTypeOrm'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '@myTypes/CreateSpecification'
import ISpecification from '@cars/entities/interfaces/ISpecification'

class SpecificationRepository implements ISpecificationRepository
{
  private repository: Repository<SpecificationTypeOrm>

  constructor()
  {
    this.repository = getRepository(SpecificationTypeOrm)
  }

  public async findByIds(specifications: string[]): Promise<ISpecification[]>
  {
    return await this.repository.findByIds(specifications)
  }

  public async create({ name, description }: CreateSpecification): Promise<void>
  {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

  public async findAll(): Promise<SpecificationTypeOrm[]>
  {
    return await this.repository.find()
  }

  public async findByName(name: string): Promise<SpecificationTypeOrm>
  {
    return await this.repository.findOne({ name })
  }
}

export default SpecificationRepository
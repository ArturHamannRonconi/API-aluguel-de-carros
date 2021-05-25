import Specification from '../entities/Specification'
import ISpecificationRepository from './interfaces/ISpecificationRepository'
import CreateSpecification from '../@types/CreateSpecification'
import { getRepository, Repository } from 'typeorm'

class SpecificationRepository implements ISpecificationRepository
{
  private repository: Repository<Specification>

  constructor()
  {
    this.repository = getRepository(Specification)
  }

  public async create({ name, description }: CreateSpecification): Promise<void>
  {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
  }

  public async list(): Promise<Specification[]>
  {
    const specifications = await this.repository.find()
    return specifications
  }

  public async findByName(name: string): Promise<Specification>
  {
    const specification = await this.repository.findOne({ name })
    return specification
  }
}

export default SpecificationRepository
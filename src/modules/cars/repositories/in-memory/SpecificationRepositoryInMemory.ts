import { v4 as generateUUID  } from 'uuid'

import Specification from '@cars/entities/implementations/Specification'
import CreateSpecification from '@myTypes/CreateSpecification'
import ISpecificationRepository from '../interfaces/ISpecificationRepository'

class SpecificationsRepositoryInMemory implements ISpecificationRepository
{
  private repository: Specification[]

  constructor()
  {
    this.repository = [
      Object.assign(new Specification(), {
        id: 'f64f260e-5fbe-4bcc-a6c4-b26c4f04328c',
        name: 'Specification Name',
        description: 'Specification description',
        created_at: new Date
      }),
      Object.assign(new Specification(), {
        id: '6a20239e-65aa-4d14-80c7-0935f3f1d8fa',
        name: 'Specification Name 2',
        description: 'Specification description 2',
        created_at: new Date
      }),
      Object.assign(new Specification(), {
        id: '5f713417-0b4e-4590-9a0f-cb7d31f1c423',
        name: 'Specification Name 3',
        description: 'Specification description 3',
        created_at: new Date
      })
    ]
  }

  public async create({ name, description }: CreateSpecification): Promise<void>
  {
    const specification = new Specification()

    Object.assign(specification, {
      id: generateUUID(),
      name,
      description,
      created_at: new Date
    })

    this.repository.push(specification)
  }

  public async findAll(): Promise<Specification[]>
  {
    return this.repository
  }

  public async findByName(name: string): Promise<Specification>
  {
    return this.repository.find(specification => specification.name === name)
  }
  
  public async findByIds(specifications: string[]): Promise<Specification[]>
  {
    return this.repository.filter(specification => specifications.includes(specification.id))
  }
}

export default SpecificationsRepositoryInMemory
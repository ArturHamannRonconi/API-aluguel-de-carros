import { inject, injectable } from 'tsyringe'

import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import ISpecification from '@cars/entities/interfaces/ISpecification'

@injectable()
class ListSpecificationByIdService
{
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {  }

  public async execute(specifications_id: string[]): Promise<ISpecification[]>
  {
    return this.specificationRepository.findByIds(specifications_id)
  }
}

export default ListSpecificationByIdService
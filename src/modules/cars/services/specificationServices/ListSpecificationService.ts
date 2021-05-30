import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import Specification from '@cars/infra/typeorm/entities/Specification'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'

@injectable()
class ListSpecificationService
{
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {  }

  public async execute(): Promise<Specification[]>
  {
    return await this.specificationRepository.list()
  }
}

export default ListSpecificationService
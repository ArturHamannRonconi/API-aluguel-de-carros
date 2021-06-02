import { inject, injectable } from 'tsyringe'

import SpecificationTypeOrm from '@cars/infra/typeorm/entities/SpecificationTypeOrm'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'

@injectable()
class ListSpecificationService
{
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {  }

  public async execute(): Promise<SpecificationTypeOrm[]>
  {
    return await this.specificationRepository.list()
  }
}

export default ListSpecificationService
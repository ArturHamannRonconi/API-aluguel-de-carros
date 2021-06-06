import { inject, injectable } from 'tsyringe'

import SpecificationTypeOrm from '@cars/infra/typeorm/entities/SpecificationTypeOrm'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'

@injectable()
class ListSpecificationByIdService
{
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {  }

  public async execute(specifications_id: string[]): Promise<SpecificationTypeOrm[]>
  {
    return this.specificationRepository.findByIds(specifications_id)
  }
}

export default ListSpecificationByIdService
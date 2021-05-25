import { inject, injectable } from 'tsyringe'

import Specification from '../../entities/Specification'
import ISpecificationRepository from '../../repositories/interfaces/ISpecificationRepository'

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
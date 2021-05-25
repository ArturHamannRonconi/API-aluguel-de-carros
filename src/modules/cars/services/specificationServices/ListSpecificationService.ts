import Specification from '../../entities/Specification'
import ISpecificationRepository from '../../repositories/interfaces/ISpecificationRepository'

class ListSpecificationService
{
  constructor(private specificationRepository: ISpecificationRepository) {  }

  public async execute(): Promise<Specification[]>
  {
    return await this.specificationRepository.list()
  }
}

export default ListSpecificationService
import Specification from '../../models/Specification'
import ISpecificationRepository from '../../repositories/interfaces/ISpecificationRepository'

class ListSpecificationService
{
  constructor(private specificationRepository: ISpecificationRepository) {  }

  public execute(): Specification[]
  {
    return this.specificationRepository.list()
  }
}

export default ListSpecificationService
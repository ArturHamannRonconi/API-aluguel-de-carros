import ISpecificationRepository from '../../repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '../../@types/CreateSpecification'

class CreateSpecificationServices
{
  constructor(private specificationRepository: ISpecificationRepository) {  }

  public execute({ name, description }: CreateSpecification): void
  {
    const specificationExists = this.specificationRepository.findByName(name)
    
    if(specificationExists)
      throw new Error('400/Specification already exists')

    this.specificationRepository.create({ name, description })
  }

}

export default CreateSpecificationServices
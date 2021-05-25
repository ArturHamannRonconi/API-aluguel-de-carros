import ISpecificationRepository from '../../repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '../../@types/CreateSpecification'

class CreateSpecificationServices
{
  constructor(private specificationRepository: ISpecificationRepository) {  }

  public async execute({ name, description }: CreateSpecification): Promise<void>
  {
    const specificationExists = await this.specificationRepository.findByName(name)
    
    if(specificationExists)
      throw new Error('400/Specification already exists')

    await this.specificationRepository.create({ name, description })
  }

}

export default CreateSpecificationServices
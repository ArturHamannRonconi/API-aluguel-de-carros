import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import CreateSpecification from '@myTypes/CreateSpecification'
import AppError from '@shared/errors/AppError'

@injectable()
class CreateSpecificationServices
{
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {  }

  public async execute({ name, description }: CreateSpecification): Promise<void>
  {
    const specificationExists = await this.specificationRepository.findByName(name)
    
    if(specificationExists)
      throw new AppError('Specification already exists')

    await this.specificationRepository.create({ name, description })
  }

}

export default CreateSpecificationServices
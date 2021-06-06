import { container, inject, injectable } from 'tsyringe'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import CreateCarSpecification from '@myTypes/CreateCarSpecification'
import AppError from '@shared/errors/AppError'
import ListSpecificationByIdService from '../specificationServices/ListSpecificationByIdService'

@injectable()
class CreateCarSpecificationService
{
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {  }

  public async execute({ car_id, specifications_id }: CreateCarSpecification): Promise<void>
  {
    const carExists = await this.carRepository.findById(car_id)
    if(!carExists) throw new AppError('Car not found', 404)

    if(!carExists.specifications)
      carExists.specifications = []

    const specificationAlreadyAdd = carExists
      .specifications.some(specification =>
        specifications_id.includes(specification.id)
      )
    
    if(specificationAlreadyAdd)
      throw new AppError('Some specification already hitched in the car', 409)
      
    const listSpecificationByIdService = container.resolve(ListSpecificationByIdService)
    const specifications = await listSpecificationByIdService.execute(specifications_id)   

    if(specifications.length < specifications_id.length)
      throw new AppError('Some specification do not exists', 404)
        
    await this.carRepository.update(car_id, { specifications })
  }
}

export default CreateCarSpecificationService
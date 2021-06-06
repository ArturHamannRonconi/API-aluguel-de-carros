import { container, inject, injectable } from 'tsyringe'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import AppError from '@shared/errors/AppError'
import FindCategoryService from '@cars/services/categoryServices/FindCategoryService'
import ListSpecificationByIdService from '../specificationServices/ListSpecificationByIdService'

@injectable()
class CreateCarService
{
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {  }

  public async execute(carAttributes: CreateCar): Promise<void>
  {
    const findCategoryService = container.resolve(FindCategoryService)
    await findCategoryService.execute(carAttributes.category_id)

    const carAlreadyExists = await this.carRepository
      .findByLicensePlate(carAttributes.license_plate)

    if(carAlreadyExists)
      throw new AppError('Car already exists')

    const listSpecificationByIdService = container.resolve(ListSpecificationByIdService)
    const specifications = await listSpecificationByIdService
      .execute(carAttributes?.specifications_id ?? [])
    
    carAttributes.specifications_id = undefined
    const car = Object.assign(carAttributes, { specifications })

    await this.carRepository.create(car)
  }
}

export default CreateCarService
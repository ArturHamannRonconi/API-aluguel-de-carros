import { container, inject, injectable } from 'tsyringe'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import AppError from '@shared/errors/AppError'
import FindCategoryService from '@cars/services/categoryServices/FindCategoryService'

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

    await this.carRepository.create(carAttributes)
  }
}

export default CreateCarService
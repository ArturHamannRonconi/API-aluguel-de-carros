import { inject, injectable } from 'tsyringe'

import ICar from '@cars/entities/interfaces/ICar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import AppError from '@shared/errors/AppError'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'

@injectable()
class ListAvailableCarService
{
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {  }

  public async execute(listBy?: ListCarByNameCategoryAndBrand): Promise<ICar[]>
  {
    const cars = await this.carRepository.findAvailable(listBy)
    if(cars.length < 0) throw new AppError('No car found', 404)

    return cars
  }
}

export default ListAvailableCarService
import ICar from '@cars/entities/ICar'
import CreateCar from '@myTypes/CreateCar'

interface ICarRepository
{
  create(createCarAttributes: CreateCar): Promise<void>
  list(): Promise<ICar[]>
  findByLicensePlate(license_plate: string): Promise<ICar>
}

export default ICarRepository
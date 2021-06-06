import ICar from '@cars/entities/interfaces/ICar'
import CreateCar from '@myTypes/CreateCar'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'

interface ICarRepository
{
  create(createCarAttributes: CreateCar): Promise<void>
  update(id: string, updateCar: UpdateCar): Promise<ICar>
  findByLicensePlate(license_plate: string): Promise<ICar>
  findAll(): Promise<ICar[]>
  findAvailable(listBy: ListCarByNameCategoryAndBrand): Promise<ICar[]>
  findById(id: string): Promise<ICar>
}

export default ICarRepository
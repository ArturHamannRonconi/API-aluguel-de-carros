import ICar from '@cars/entities/interfaces/ICar'
import CarCost from '@myTypes/CarCost'
import CreateCar from '@myTypes/CreateCar'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'

interface ICarRepository
{
  create(createCarAttributes: CreateCar): Promise<void>
  update(id: string, updateCar: UpdateCar): Promise<ICar>
  updateAvailable(id: string): Promise<void>
  findByLicensePlate(license_plate: string): Promise<ICar>
  findAll(): Promise<ICar[]>
  findAvailable(listBy: ListCarByNameCategoryAndBrand): Promise<ICar[]>
  findById(id: string): Promise<ICar>
  getCarCost(car_id: string): Promise<CarCost>
}

export default ICarRepository
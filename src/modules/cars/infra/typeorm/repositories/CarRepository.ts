import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import { getRepository, Repository } from 'typeorm'
import CarTypeOrm from '@cars/infra/typeorm/entities/CarTypeOrm'
import ICar from '@cars/entities/interfaces/ICar'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'

class CarRepository implements ICarRepository
{
  private repository: Repository<CarTypeOrm>

  constructor()
  {
    this.repository = getRepository(CarTypeOrm)
  }

  public async update(id: string, updateCar: UpdateCar): Promise<void>
  {
    const car = await this.repository.update(id, updateCar)
    console.log(car)
  }

  public async findById(id: string): Promise<ICar>
  {
    return this.repository.findOne(id)
  }

  public async create(createCarAttributes: CreateCar): Promise<void>
  {
    const car = this.repository.create(createCarAttributes)
    await this.repository.save(car)
  }

  public async findAll(): Promise<CarTypeOrm[]>
  {
    return await this.repository.find()
  }

  public async findByLicensePlate(license_plate: string): Promise<CarTypeOrm>
  {
    return await this.repository.findOne({ license_plate })
  }

  public async findAvailable(listBy: ListCarByNameCategoryAndBrand = {}): Promise<ICar[]>
  {
    const where = { available: true, ...listBy }
    return this.repository.find({ where })
  }
}

export default CarRepository
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import { getRepository, Repository } from 'typeorm'
import CarTypeOrm from '@cars/infra/typeorm/entities/CarTypeOrm'

class CarRepository implements ICarRepository
{
  private repository: Repository<CarTypeOrm>

  constructor()
  {
    this.repository = getRepository(CarTypeOrm)
  }

  public async create(createCarAttributes: CreateCar): Promise<void>
  {
    const car = this.repository.create(createCarAttributes)
    await this.repository.save(car)
  }

  public async list(): Promise<CarTypeOrm[]>
  {
    const cars = this.repository.find()
    return cars
  }

  public async findByLicensePlate(license_plate: string): Promise<CarTypeOrm>
  {
    const car = this.repository.findOne({ license_plate })
    return car
  }
}

export default CarRepository
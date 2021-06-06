import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import { getRepository, Repository } from 'typeorm'
import CarTypeOrm from '@cars/infra/typeorm/entities/CarTypeOrm'
import ICar from '@cars/entities/interfaces/ICar'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'
import SpecificationTypeOrm from '../entities/SpecificationTypeOrm'

class CarRepository implements ICarRepository
{
  private repository: Repository<CarTypeOrm>

  constructor()
  {
    this.repository = getRepository(CarTypeOrm)
  }

  public async update(id: string, updateCar: UpdateCar): Promise<CarTypeOrm>
  {
    const car = await this.repository.findOne(id)
    Object.assign(car, updateCar)
    return await this.repository.save(car)
  }

  public async create(createCarAttributes: CreateCar): Promise<void>
  {
    const car = new CarTypeOrm()
    Object.assign(car, createCarAttributes)
    await this.repository.save(car)
  }

  public async findById(id: string): Promise<ICar>
  {
    return this.repository.findOne(id,{
      relations: ['specifications']
    })
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
    return this.repository.find({
      relations: ['specifications'],
      where: { available: true, ...listBy }
    })
  }
}

export default CarRepository
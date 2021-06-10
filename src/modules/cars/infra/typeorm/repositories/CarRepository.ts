import { getRepository, Repository } from 'typeorm'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CreateCar from '@myTypes/CreateCar'
import CarTypeOrm from '@cars/infra/typeorm/entities/CarTypeOrm'
import ICar from '@cars/entities/interfaces/ICar'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'
import CarCost from '@myTypes/CarCost'

class CarRepository implements ICarRepository
{
  private repository: Repository<CarTypeOrm>

  constructor()
  {
    this.repository = getRepository(CarTypeOrm)
  }

  public async getCarCost(car_id: string): Promise<CarCost>
  {
    const carCost = await this.repository.findOne(car_id, {
      select: ['fine_amount', 'daily_rate']
    })

    return carCost
  }

  public async updateAvailable(id: string): Promise<void>
  {
    const { available } = await this.repository
      .findOne(id, { select: ['available'] })

    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available: !available })
      .where('id = :id', { id })
      .execute()
  }

  public async update(id: string, updateCar: UpdateCar): Promise<CarTypeOrm>
  {
    const car = await this.repository.findOne(id, {
      relations: ['specifications']
    })

    Object.assign(car, {
      fine_amount: updateCar.fine_amount,
      available: updateCar.available,
      daily_rate: updateCar.daily_rate,
      license_plate: updateCar.license_plate
    })

    updateCar.specifications
      .forEach(specification => car.specifications.push(specification))

    return await this.repository.save(car)
  }

  public async create(createCarAttributes: CreateCar): Promise<void>
  {
    const car = new CarTypeOrm()
    Object.assign(car, createCarAttributes)
    await this.repository.save(car)
  }

  public async findById(id: string): Promise<CarTypeOrm>
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
      relations: ['specifications', 'category'],
      where: { available: true, ...listBy }
    })
  }
}

export default CarRepository
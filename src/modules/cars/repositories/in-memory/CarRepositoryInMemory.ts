import { v4 as genereateUuid } from 'uuid'

import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '../interfaces/ICarRepository'
import ICar from '@cars/entities/ICar'
import Car from '@cars/infra/typeorm/entities/Car'

class CarRepositoryInMemory implements ICarRepository
{
  repository: ICar[]

  constructor()
  {
    this.repository = []
  }
  
  public async create(createCarAttributes: CreateCar): Promise<void>
  {
    const car = new Car()

    Object.assign(car, {
      ...createCarAttributes,
      id: genereateUuid(),
      available: true,
      created_at: new Date()
    })
    
    this.repository.push(car)
  }
  
  public async list(): Promise<ICar[]>
  {
    return this.repository
  }
  
  public async findByLicensePlate(license_plate: string): Promise<ICar>
  {
    return this.repository.find(car => car.license_plate === license_plate)
  }
}

export default CarRepositoryInMemory
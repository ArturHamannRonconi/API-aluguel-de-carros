import { v4 as genereateUuid } from 'uuid'

import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import ICar from '@cars/entities/interfaces/ICar'
import Car from '@cars/entities/implementations/Car'

class CarRepositoryInMemory implements ICarRepository
{
  private repository: ICar[]

  constructor()
  {
    this.repository = [
      {
        id: '2eafd3bb-0ff3-4a53-86fa-5dcb1cd32df9',
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: '3de39bd1-0d5c-46c1-ace1-394aa5db369e',
        available: true,
        created_at: new Date
      },
      {
        id: '1d3066d6-ce69-4bc1-9282-7a417e9b0d8b',
        name: 'Name Car Two',
        description: 'Description Car Two',
        daily_rate: 300,
        license_plate: 'ABC-4321',
        fine_amount: 200,
        brand: 'Brand Two',
        category_id: 'b17af4e0-c2c3-4003-af17-6df6e2928ee8',
        available: false,
        created_at: new Date
      }
    ]
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
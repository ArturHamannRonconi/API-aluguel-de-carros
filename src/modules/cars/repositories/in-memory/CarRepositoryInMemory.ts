import { v4 as genereateUuid } from 'uuid'

import CreateCar from '@myTypes/CreateCar'
import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import Car from '@cars/entities/implementations/Car'
import ListCarByNameCategoryAndBrand from '@myTypes/ListCarByNameCategoryAndBrand'
import UpdateCar from '@myTypes/UpdateCar'
import CarCost from '@myTypes/CarCost'

class CarRepositoryInMemory implements ICarRepository
{
  private repository: Car[]

  constructor()
  {
    this.repository = [
      Object.assign(new Car(), {
        id: '2eafd3bb-0ff3-4a53-86fa-5dcb1cd32df9',
        name: 'Name Car',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: '3de39bd1-0d5c-46c1-ace1-394aa5db369e',
        available: true,
        created_at: new Date,
        specifications: []
      }),
      Object.assign(new Car(), {
        id: 'e357f477-16f4-4db7-8017-b6d2d5d8519b',
        name: 'Name Car Two',
        description: 'Description Car Two',
        daily_rate: 550,
        license_plate: 'CBA-1234',
        fine_amount: 35,
        brand: 'Brand Two',
        category_id: 'b17af4e0-c2c3-4003-af17-6df6e2928ee8',
        available: true,
        created_at: new Date,
        specifications: []
      }),
      Object.assign(new Car(), {
        id: '1d3066d6-ce69-4bc1-9282-7a417e9b0d8b',
        name: 'Name Car Three',
        description: 'Description Car Three',
        daily_rate: 300,
        license_plate: 'ABC-4321',
        fine_amount: 200,
        brand: 'Brand Three',
        category_id: 'b17af4e0-c2c3-4003-af17-6df6e2928ee8',
        available: false,
        created_at: new Date,
        specifications: []
      })
    ]
  }

  public async getCarCost(car_id: string): Promise<CarCost>
  {
    const carCost = this.repository.reduce((acc, car) => {
      if(car.id === car_id) {
        acc['daily_rate'] = car.daily_rate
        acc['fine_amount'] = car.fine_amount
      }

      return acc
    }, {}) as CarCost

    return carCost
  }

  public async updateAvailable(id: string): Promise<void>
  {
    const carIndex = this.repository.findIndex(car => car.id === id)
    this.repository[carIndex].available = !this.repository[carIndex].available 
  }

  public async update(id: string, updateCar: UpdateCar): Promise<Car>
  {
    const car = this.repository.find(car => car.id === id)
    const indexCar = this.repository.findIndex(car => car.id === id)
    
    this.repository.splice(indexCar, 1)
    Object.assign(car, updateCar)

    this.repository.push(car)
    return car
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
  
  public async findAll(): Promise<Car[]>
  {
    return this.repository
  }
  
  public async findByLicensePlate(license_plate: string): Promise<Car>
  {
    return this.repository.find(car => car.license_plate === license_plate)
  }

  public async findAvailable(listBy: ListCarByNameCategoryAndBrand = {}): Promise<Car[]>
  {
    return this.repository.filter(car => {
      const hasListOptions =
        (listBy?.name && car.name === listBy?.name) ||
        (listBy?.category_id && car. category_id === listBy?.category_id) ||
        (listBy?.brand && car.brand === listBy?.brand)

      const noHasListOptions =
        !listBy?.name &&
        !listBy?.category_id &&
        !listBy?.brand

      if(car.available && (hasListOptions || noHasListOptions))
        return car
    })
  }

  public async findById(id: string): Promise<Car>
  {
    return this.repository.find(car => car.id === id)
  }
}

export default CarRepositoryInMemory
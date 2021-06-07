import { v4 as generateUUID } from 'uuid'

import Rental from '@rentals/entities/implementations/Rental'
import IRentalRepository from '../interfaces/IRentalRepository'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'

class RentalRepositoryInMemory implements IRentalRepository
{
  private repository: Rental[]

  constructor()
  {
    this.repository = []
  }

  public async create(rent: CreateRentalRepo): Promise<Rental>
  {
    const rental = new Rental()

    Object.assign(rental, {
      ...rent,
      id: generateUUID(),
      total: null,
      end_date: null,
      created_at: new Date,
      updated_at: new Date
    })

    this.repository.push(rental)

    return rental
  }

  public async userAlreadyReservedCar(user_id: string): Promise<boolean>
  {
    const alreadyReserved = this.repository.some(rent => 
      rent.user_id === user_id && !rent.end_date
    )
    
    return alreadyReserved
  }

  public async carAlreadyReserved(car_id: string): Promise<boolean>
  {
    const alreadyReserved = this.repository.some(rent => 
      rent.car_id === car_id && !rent.end_date
    )
    
    return alreadyReserved
  }
}

export default RentalRepositoryInMemory
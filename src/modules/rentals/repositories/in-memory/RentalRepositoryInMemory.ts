import { v4 as generateUUID } from 'uuid'

import Rental from '@rentals/entities/implementations/Rental'
import IRentalRepository from '../interfaces/IRentalRepository'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'
import DayjsDateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import IRental from '@rentals/entities/interfaces/IRental'
import RentalAddInfo from '@myTypes/RentalAddInfo'

class RentalRepositoryInMemory implements IRentalRepository
{
  private repository: Rental[]

  constructor()
  {
    const { entrance, deadline } = DayjsDateProvider.formatDate({
      start_date: '07/06/2021 16:52',
      expect_return_date: '08/06/2021 16:52',
      formatDate: 'DD/MM/YYYY HH:mm'
    })

    this.repository = [
      Object.assign(new Rental(), {
        id: '1aa0fe9c-2dea-4393-9950-97b3efa196a1',
        user_id: 'e357f477-16f4-4db7-8017-b6d2d5d8519b',
        car_id: '2d2e9d13-bcf8-4d4c-a9f4-8ee848a9b4e4',
        start_date: entrance,
        expect_return_date: deadline,
        end_date: null,
        total: null
      })
    ]
  }

  public async update(rent_id: string, add_info: RentalAddInfo): Promise<void>
  {
    const rental = this.repository.find(rental => rental.id === rent_id)
    const index = this.repository.findIndex(rental => rental.id === rent_id)

    Object.assign(rental, add_info)

    this.repository[index] = rental
  }

  public async findLastRentalByUserId(user_id: string): Promise<IRental>
  {
    return this.repository.find(rent => rent.user_id === user_id && !rent.end_date)
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
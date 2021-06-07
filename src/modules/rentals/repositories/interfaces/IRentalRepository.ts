import IRental from '@rentals/entities/interfaces/IRental'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'

interface IRentalRepository
{
  create(rent: CreateRentalRepo): Promise<IRental>
  userAlreadyReservedCar(user_id: string): Promise<boolean>
  carAlreadyReserved(car_id: string): Promise<boolean>
}

export default IRentalRepository
import IRental from '@rentals/entities/interfaces/IRental'
import CreateRentalRepo from '@myTypes/CreateRentalRepo'
import RentalAddInfo from '@myTypes/RentalAddInfo'

interface IRentalRepository
{
  create(rent: CreateRentalRepo): Promise<IRental>
  update(rent_id: string, add_info: RentalAddInfo): Promise<Date>
  userAlreadyReservedCar(user_id: string): Promise<boolean>
  carAlreadyReserved(car_id: string): Promise<boolean>
  findLastRentalByUserId(user_id: string): Promise<IRental>
  findAllRentalByUserId(user_id: string): Promise<IRental[]>
}

export default IRentalRepository
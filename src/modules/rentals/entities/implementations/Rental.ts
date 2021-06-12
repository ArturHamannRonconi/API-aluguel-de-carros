import User from '@accounts/entities/implementations/User'
import Car from '@cars/entities/implementations/Car'
import IRental from '@rentals/entities/interfaces/IRental'

class Rental implements IRental
{
  id: string
  car_id: string
  user_id: string
  start_date: Date
  end_date: Date
  expect_return_date: Date
  total: number
  created_at: Date
  updated_at: Date
  car: Car
  user: User
}

export default Rental 
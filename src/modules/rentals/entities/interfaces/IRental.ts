import IUser from '@accounts/entities/interfaces/IUser'
import ICar from '@cars/entities/interfaces/ICar'

interface IRental
{
  id: string
  car_id: string
  user_id: string
  start_date: Date
  end_date: Date
  expect_return_date: Date
  total: number
  car: ICar
  user: IUser
  created_at: Date
  updated_at: Date
}

export default IRental
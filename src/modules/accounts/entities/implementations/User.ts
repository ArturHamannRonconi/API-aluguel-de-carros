import Rental from '@rentals/entities/implementations/Rental'
import IUser from '../interfaces/IUser'

class User implements IUser
{
  id: string
  name: string
  username: string
  email: string
  password: string
  driver_license: string
  is_admin: boolean
  avatar: string
  rentals: Rental[]
  created_at: Date
}

export default User
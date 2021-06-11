import IRental from '@rentals/entities/interfaces/IRental'

interface IUser
{
  id: string
  name: string
  username: string
  email: string
  password: string
  driver_license: string
  is_admin: boolean
  rentals: IRental[]
  avatar: string
  created_at: Date
}

export default IUser
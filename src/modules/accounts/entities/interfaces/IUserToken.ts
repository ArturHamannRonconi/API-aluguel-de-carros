import IUser from './IUser'

interface IUserToken
{
  id : string
  refresh_token: string
  user_id: string
  user: IUser
  expires_date: Date
  created_at: Date
}

export default IUserToken
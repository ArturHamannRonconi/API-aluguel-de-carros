import IUserToken from '../interfaces/IUserToken'
import User from './User'

class UserToken implements IUserToken
{
  id: string;
  refresh_token: string;
  user_id: string;
  user: User;
  expires_dae: Date;
  created_at: Date;
}

export default UserToken
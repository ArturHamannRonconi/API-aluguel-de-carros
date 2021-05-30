import IUser from '../interfaces/IUser'

class UserInMeMory implements IUser
{
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  driver_license: string;
  is_admin: boolean;
  avatar: string;
  created_at: Date;

}

export default UserInMeMory
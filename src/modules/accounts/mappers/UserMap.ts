import IUser from '@accounts/entities/interfaces/IUser'
import UserProfile from '@myTypes/UserProfile'

class UserMap
{
  public static filter({ name, username, email, avatar }: IUser): UserProfile
  {
    const avatar_url = `${process.env.AVATAR_URL}/avatar/${avatar}`

    return { name, username, email, avatar_url }
  }
}

export default UserMap
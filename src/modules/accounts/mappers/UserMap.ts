import IUser from '@accounts/entities/interfaces/IUser'
import UserProfile from '@myTypes/UserProfile'

class UserMap
{
  public static filter({ name, username, email, avatar }: IUser): UserProfile
  {
    const map = { name, username, email } as UserProfile

    avatar
      ? map.avatar_url = `${process.env.AVATAR_URL}/avatar/${avatar}`
      : null

    return map
  }
}

export default UserMap
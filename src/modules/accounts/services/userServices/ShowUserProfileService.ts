import { inject, injectable } from 'tsyringe'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserProfile from '@myTypes/UserProfile'
import UserMap from '@accounts/mappers/UserMap'

@injectable()
class ShowUserProfileService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async execute(user_id: string): Promise<UserProfile>
  {
    const user = await this
      .userRepository
      .findById(user_id)

    return UserMap.filter(user)
  }
}

export default ShowUserProfileService
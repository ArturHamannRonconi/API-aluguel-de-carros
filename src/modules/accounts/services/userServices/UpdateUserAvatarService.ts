import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserAvatar from '@myTypes/UserAvatar'
import FileUtil from '@utils/FileUtil'

@injectable()
class UpdateUserAvatarService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {  }

  public async deleteOldAvatar(user_id: string): Promise<void>
  {
    const user = await this.userRepository.findById(user_id)

    const fileUtil = new FileUtil()
    await fileUtil.deleteFile(user.avatar)
  }

  public async execute({ user_id, avatar_file }: UserAvatar): Promise<void>
  {
    await this.deleteOldAvatar(user_id)

    await this.userRepository.update({
      user_id,
      add_info: { avatar: avatar_file }
    })
  }
}

export default UpdateUserAvatarService
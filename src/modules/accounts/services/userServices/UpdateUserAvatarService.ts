import { inject, injectable } from 'tsyringe'

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserAvatar from '@myTypes/UserAvatar'
import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider'

@injectable()
class UpdateUserAvatarService
{
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {  }

  public async execute({ user_id, avatar_file }: UserAvatar): Promise<void>
  {
    await this.deleteOldAvatar(user_id)
    await this.saveNewAvatar({ user_id, avatar_file })
  }

  private async deleteOldAvatar(user_id: string): Promise<void>
  {
    const user = await this
      .userRepository
      .findById(user_id)

    this.storageProvider.delete(user.avatar, 'avatar')
  }

  private async saveNewAvatar({ user_id, avatar_file }: UserAvatar): Promise<void>
  {
    await Promise.all([
      this.storageProvider.save(avatar_file, 'avatar'),
      this.userRepository.update({
        user_id,
        add_info: { avatar: avatar_file }
      })
    ])
  }
}

export default UpdateUserAvatarService
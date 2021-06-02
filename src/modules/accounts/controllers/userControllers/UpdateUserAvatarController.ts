import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@accounts/services/userServices/UpdateUserAvatarService'

class UpdateUserAvatarController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const avatar_file = request.file.path
    const user_id = request.user_id as string

    const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

    await updateUserAvatarService.execute({ user_id, avatar_file })

    return response.status(204).end()
  }
}

export default new UpdateUserAvatarController()
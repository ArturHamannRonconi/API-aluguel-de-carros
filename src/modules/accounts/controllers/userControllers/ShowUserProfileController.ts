import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ShowUserProfileService from '@accounts/services/userServices/ShowUserProfileService'

class ShowUserProfileController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { user_id } = request

    const showUserProfileService = container.resolve(ShowUserProfileService)
    const user = await showUserProfileService.execute(user_id)

    return response.json(user)
  }
}

export default new ShowUserProfileController()
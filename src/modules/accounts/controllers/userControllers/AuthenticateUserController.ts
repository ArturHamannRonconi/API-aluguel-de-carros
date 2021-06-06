import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@accounts/services/userServices/AuthenticateUserService'
import UserAccount from '@myTypes/UserAccount'

class AuthenticateUserController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const { email, username, password } = request.body as UserAccount      
    const authenticateUserService = container.resolve(AuthenticateUserService)

    const token = await authenticateUserService.execute({ email, username, password })

    return response.json(token) 
  }

}

export default new AuthenticateUserController()
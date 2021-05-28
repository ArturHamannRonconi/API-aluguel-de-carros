import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '../../services/userServices/AuthenticateUserService'
import UserAccount from '../../@types/UserAccount'

class AuthenticateUserController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const { email, username, password } = request.body as UserAccount      
    const authenticateUserService = container.resolve(AuthenticateUserService)

    const token = await authenticateUserService.execute({ email, username, password })

    return response.status(200).json(token) 
  }

}

export default AuthenticateUserController
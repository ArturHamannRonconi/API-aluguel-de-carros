import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '../../services/userServices/CreateUserService'
import CreateUser from '../../@types/CreateUser'

class CreateUserController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const { name, username, email, password, driver_license } = request.body as CreateUser

    const createUserService = container.resolve(CreateUserService)
    await createUserService.execute({ name, username, email, password, driver_license })

    return response.status(201).end()
  }
}

export default CreateUserController
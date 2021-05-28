import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateCategoryServices from '../../services/categoryServices/CreateCategoryService'
class CreateCategoryController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const { name, description } = request.body
    const createCategoryServices = container.resolve(CreateCategoryServices)

    await createCategoryServices.execute({ name, description })
    return response.status(201).end()
  }
}

export default CreateCategoryController
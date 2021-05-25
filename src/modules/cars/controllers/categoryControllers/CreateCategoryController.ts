import { Request, Response } from 'express'

import Controller from '../Controller'
import CreateCategoryServices from '../../services/categoryServices/CreateCategoryService'

class CreateCategoryController extends Controller
{
  constructor(private createCategoryServices: CreateCategoryServices) { super() }

  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    return await super.tryCatchEnd(async () => {
      const { name, description } = request.body
      await this.createCategoryServices.execute({ name, description })
    }, response, 201)
  }
}

export default CreateCategoryController
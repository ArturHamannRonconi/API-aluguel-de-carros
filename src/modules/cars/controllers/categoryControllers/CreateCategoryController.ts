import { Request, Response } from 'express'

import Controller from '../Controller'
import CreateCategoryServices from '../../services/categoryServices/CreateCategoryService'

class CreateCategoryController extends Controller
{
  constructor(private createCategoryServices: CreateCategoryServices) { super() }

  public execute(request: Request, response: Response): Response | void
  {
    return super.tryCatchEnd(() => {
      const { name, description } = request.body
      this.createCategoryServices.execute({ name, description })
    }, response, 201)
  }
}

export default CreateCategoryController
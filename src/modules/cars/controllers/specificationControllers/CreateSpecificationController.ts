import { Request, Response } from 'express'

import Controller from '../Controller'
import CreateSpecificationServices from '../../services/CreateSpecificationServices'

class CreateSpecificationController extends Controller
{
  constructor(private createSpecificationService: CreateSpecificationServices) { super() }

  execute(request: Request, response: Response): Response | void
  {
    return super.tryCatchEnd(() => {
      const { name, description } = request.body
      this.createSpecificationService.execute({ name, description })
    }, response, 201)
  }
}

export default CreateSpecificationController
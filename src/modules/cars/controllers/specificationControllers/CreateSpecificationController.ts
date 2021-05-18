import { Request, Response } from 'express'

import Controller from '../Controller'
import CreateSpecificationServices from '../../services/specificationServices/CreateSpecificationService'

class CreateSpecificationController extends Controller
{
  constructor(private createSpecificationService: CreateSpecificationServices) { super() }

  public handle(request: Request, response: Response): Response | void
  {
    return super.syncTryCatchEnd(() => {
      const { name, description } = request.body
      this.createSpecificationService.execute({ name, description })
    }, response, 201)
  }
}

export default CreateSpecificationController
import { Request, Response } from 'express'

import Controller from '../Controller'
import CreateSpecificationServices from '../../services/specificationServices/CreateSpecificationService'

class CreateSpecificationController extends Controller
{
  constructor(private createSpecificationService: CreateSpecificationServices) { super() }

  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    return await super.tryCatchEnd(async () => {
      const { name, description } = request.body
      await this.createSpecificationService.execute({ name, description })
    }, response, 201)
  }
}

export default CreateSpecificationController
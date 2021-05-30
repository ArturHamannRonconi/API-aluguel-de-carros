import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSpecificationServices from '@cars/services/specificationServices/CreateSpecificationService'

class CreateSpecificationController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    const { name, description } = request.body
    const createSpecificationService = container.resolve(CreateSpecificationServices)
      
    await createSpecificationService.execute({ name, description })
    return response.status(201).end()
  }
}

export default CreateSpecificationController
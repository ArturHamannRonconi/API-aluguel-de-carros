import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateSpecificationServices from '../../services/specificationServices/CreateSpecificationService'

class CreateSpecificationController
{
  public async handle(request: Request, response: Response): Promise<Response | void>
  {
    try {
      const { name, description } = request.body
      const createSpecificationService = container.resolve(CreateSpecificationServices)
      
      await createSpecificationService.execute({ name, description })
      return response.status(201).end()

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return response.status(statusCodeError).json({ error: message })
    }
  }
}

export default CreateSpecificationController
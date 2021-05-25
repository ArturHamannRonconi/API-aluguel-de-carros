import { Response } from 'express'

class Controller
{
  protected async tryCatchJson(callback: CallableFunction, res: Response, statusCode: number): Promise<Response>
  {
    try {
      
      const returned = await callback()
      return res.status(statusCode).json(returned)

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return res.status(statusCodeError).json({ error: message })
    }
  }

  protected async tryCatchEnd(callback: CallableFunction, res: Response, statusCode: number): Promise<Response | void>
  {
    try {
      
      await callback()
      return res.status(statusCode).end()

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return res.status(statusCodeError).json({ error: message })
    }
  }
}

export default Controller
import { Response } from 'express'

class Controller
{
  protected tryCatchJson(callback: CallableFunction, res: Response, statusCode: number): Response | void
  {
    try {
      
      const returned = callback()
      return res.status(statusCode).json(returned)

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return res.status(statusCodeError).json({ error: message })
    }
  }

  protected tryCatchEnd(callback: CallableFunction, res: Response, statusCode: number): Response | void
  {
    try {
      
      callback()
      return res.status(statusCode).end()

    } catch (error) {
      const [ statusCodeError, message ] = error.message.split('/')

      return res.status(statusCodeError).json({ error: message })
    }
  }
}

export default Controller
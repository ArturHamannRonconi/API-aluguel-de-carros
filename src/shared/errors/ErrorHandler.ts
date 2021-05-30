import { Request, Response, NextFunction } from 'express'
import AppError from './AppError'

class ErrorHandler
{
  public async handle(err: Error | AppError, request: Request, response: Response, next: NextFunction): Promise<Response>
  {
    if(err instanceof AppError) return response.status(err.code).json({ error: err.message })

    return response.status(500).json({ message: `Internal server error - ${err.message}` })
  }
}

export default new ErrorHandler()
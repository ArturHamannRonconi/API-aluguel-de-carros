import UserRepository from '@accounts/infra/typeorm/repositories/UserRepository'
import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'

class AuthorizationHandler
{
  public async exec(request: Request, response: Response, next: NextFunction): Promise<void>
  {
    const user_id = request.user_id
  
    const userRepository = new UserRepository()
    const user = await userRepository.findById(user_id)

    if(!user.is_admin)
      throw new AppError('Only admin users are authorized', 401)

    return next()
  }
}

export default new AuthorizationHandler()
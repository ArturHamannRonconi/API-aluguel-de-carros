import { Request, Response, NextFunction } from 'express'
import { verify, Secret } from 'jsonwebtoken'

import PayloadDecoded from '@myTypes/PayloadDecoded'
import UserRepository from '@accounts/infra/typeorm/repositories/UserRepository'
import AppError from '@shared/errors/AppError'

class AuthenticationHandler
{
  public async handle(request: Request, response: Response, next: NextFunction): Promise<NextFunction | Response>
  {
    try { 
      const authHeader = request.headers.authorization

      if(!authHeader) throw new AppError('Token missing', 401)

      const token = authHeader.split(' ').pop()
      const privateKey: Secret = '7a08a0940a9343e60c812a9a70ea65cb'

      const payload = verify(token, privateKey) as PayloadDecoded
      if(!payload) throw new AppError('Invalid Token', 401)
  
      const userRepository = new UserRepository() 
      const user = await userRepository.findById(payload.sub)
  
      if(!user) throw new AppError('User does not exists!', 401)
      
      request.user_id = payload.sub as string
      next() 
    } catch (err) {
      if(err instanceof AppError) return response.status(err.code).json({ error: err.message })

      return response.status(500).json({ message: `Internal server error - ${err.message}` })
    }
  }
}

export default AuthenticationHandler
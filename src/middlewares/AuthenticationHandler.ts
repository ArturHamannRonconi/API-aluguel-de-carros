import { Request, Response, NextFunction } from 'express'
import { verify, Secret, VerifyCallback, VerifyErrors } from 'jsonwebtoken'

import PayloadDecoded from '../@types/PayloadDecoded'
import UserRepository from '../modules/accounts/repositories/UserRepository'
import AppError from '../errors/AppError'

class AuthenticationHandler
{
  public async handle(request: Request, response: Response, next: NextFunction): Promise<NextFunction | void>
  {
    
    const authHeader = request.headers.authorization

    if(!authHeader) throw new AppError('Token missing', 401)

    const token = authHeader.split(' ').pop()
    const privateKey: Secret = '7a08a0940a9343e60c812a9a70ea65cb'
    const verifyCallback: VerifyCallback = async (error: VerifyErrors,  payload: PayloadDecoded) => {
      if(error) throw new AppError('Invalid Token', 401)

      const userRepository = new UserRepository() 
      const user = await userRepository.findById(payload.sub)

      if(!user) throw new AppError('User does not exists!', 401)
      
      request.user_id = payload.sub as string
      next() 
    }
    
    verify(token, privateKey, verifyCallback)
  }
}

export default AuthenticationHandler
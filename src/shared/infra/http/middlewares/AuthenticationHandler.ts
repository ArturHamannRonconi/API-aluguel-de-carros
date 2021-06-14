import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import PayloadDecoded from '@myTypes/PayloadDecoded'
import AppError from '@shared/errors/AppError'
import Auth from '@config/Auth'
import UserTokenRepository from '@accounts/infra/typeorm/repositories/UserTokenRepository'

class AuthenticationHandler
{
  public async exec(request: Request, response: Response, next: NextFunction): Promise<Response | void>
  {
    const authHeader = request.headers.authorization

    if(!authHeader) throw new AppError('Token missing', 401)

    const token = authHeader.split(' ').pop()

    const payload = verify(token, Auth.PRIVATE_KEY_REFRESH_TOKEN) as PayloadDecoded
    if(!payload) throw new AppError('Invalid Token', 401)
  
    const userTokenRepository = new UserTokenRepository()
    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      payload.sub,
      token
    )
    
    if(!user) throw new AppError('User does not exists!', 401)
      
    request.user_id = payload.sub as string
    return next()
  }
}

export default new AuthenticationHandler()
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ResetPasswordService from '@accounts/services/userServices/ResetPasswordService'

class ResetPasswordController
{
  public async handle(request: Request, response: Response): Promise<void>
  {
    const { token } = request.query
    const { password } = request.body 

    const resetPasswordService = container.resolve(ResetPasswordService)
    await resetPasswordService.execute({
      password,
      token: String(token)
    })

    return response.end()
  }
}

export default new ResetPasswordController()
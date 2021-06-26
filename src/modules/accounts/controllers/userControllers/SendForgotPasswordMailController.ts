import { Request, Response } from 'express'
import { container } from 'tsyringe'

import SendForgotPasswordMailService from '@accounts/services/userServices/SendForgotPasswordMailService'

class SendForgotPasswordMailController
{
  public async handle(request: Request, response: Response): Promise<Response>
  {
    const { email } = request.body

    const sendForgotPasswordMailService = container.resolve(SendForgotPasswordMailService)    
    await sendForgotPasswordMailService.execute(email)
    
    return response.json()
  }

}

export default new SendForgotPasswordMailController()
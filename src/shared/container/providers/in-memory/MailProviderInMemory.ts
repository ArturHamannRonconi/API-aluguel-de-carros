import MailContent from '@myTypes/MailContent'
import IMailProvider from '../MailProvider/IMailProvider'

class MailProviderInMemory implements IMailProvider
{
  private messages: any[]

  constructor()
  {
    this.messages = []    
  }

  async sendMail(receiver: string, mailContent: MailContent, variables: any): Promise<void>
  {
    this.messages.push({
      receiver,
      mailContent,
      variables
    })
  }
}

export default MailProviderInMemory
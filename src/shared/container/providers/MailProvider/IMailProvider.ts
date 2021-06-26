import MailContent from '@myTypes/MailContent'

interface IMailProvider
{
  sendMail(receiver: string, { subject, template_path }: MailContent, variables: any): Promise<void>
}

export default IMailProvider
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'
import handlebars from 'handlebars'
import fs from 'fs'


import MailContent from '@myTypes/MailContent'
import IMailProvider from '../IMailProvider'

@injectable()
class EtherealMailProvider implements IMailProvider
{
  private client: Transporter

  constructor()
  {
    nodemailer.createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(err => console.error(err))
  }

  public async sendMail(receiver: string, { subject, template_path }: MailContent, variables: any): Promise<void>
  {
    const html = this.getHTMLEmailContent(template_path, variables)

    const message = await this.client.sendMail({
      to: receiver,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html
    })

    this.logMessage(message)
  }

  private getHTMLEmailContent(template_path: string, variables: any): string
  {
    const templateFileContent = fs
      .readFileSync(template_path)
      .toString('utf-8')

    const templateParse = handlebars
      .compile(templateFileContent)

    return templateParse(variables)
  }

  private logMessage(message: any): void
  {
    console.log('Message send: %s', message.messageId)
    console.log('Message send: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
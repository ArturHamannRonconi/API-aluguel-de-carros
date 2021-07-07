import fs from 'fs'
import handlebars from 'handlebars'
import aws from 'aws-sdk'

import MailContent from '@myTypes/MailContent'
import IMailProvider from '../IMailProvider'
import { createTransport, Transporter } from 'nodemailer'

class SESMailProvider implements IMailProvider
{
  private client: Transporter

  constructor()
  {
    const ses = new aws.SES({
      apiVersion: process.env.AWS_SES_API_VERSION,
      region: process.env.AWS_SES_REGION
    })

    this.client = createTransport({
      SES: { ses, aws }
    })
  }

  public async sendMail(receiver: string, { subject, template_path }: MailContent, variables: any): Promise<void>
  {
    const html = this.getHTMLEmailContent(template_path, variables)
    await this.client.sendMail({
      from: `Rentx <${process.env.AWS_SES_EMAIL_SENDER}>`,
      to: receiver,
      subject,
      html
    })
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
}

export default SESMailProvider
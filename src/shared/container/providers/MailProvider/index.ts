import { container } from 'tsyringe'

import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider'
import SES2MailProvider from '@shared/container/providers/MailProvider/implementations/SESMailProvider'
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'

const MailProvider = {
  dev: EtherealMailProvider,
  prod: SES2MailProvider
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  new MailProvider[process.env.ENVIROMENT]()
)
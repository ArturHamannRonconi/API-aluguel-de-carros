import { container } from 'tsyringe'

import IDateProvider from './IDateProvider'
import DateProvider from './implementations/DayjsDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
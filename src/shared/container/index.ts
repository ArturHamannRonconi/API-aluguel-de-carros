import { container } from 'tsyringe'

import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepository from '@cars/infra/typeorm/repositories/CategoryRepository'

import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import SpecificationRepository from '@cars/infra/typeorm/repositories/SpecificationRepository' 

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserRepository from '@accounts/infra/typeorm/repositories/UserRepository'

import ICarRepository from '@cars/repositories/interfaces/ICarRepository'
import CarRepository from '@cars/infra/typeorm/repositories/CarRepository'

import ICarImageRepository from '@cars/repositories/interfaces/ICarImageRepository'
import CarImageRepository from '@cars/infra/typeorm/repositories/CarImageRepository'

import IRentalRepository from '@rentals/repositories/interfaces/IRentalRepository'
import RentalRepository from '@rentals/infra/typeorm/repositories/RentalRepository'

import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'
import UserTokenRepository from '@accounts/infra/typeorm/repositories/UserTokenRepository'

import IDateProvider from '@shared/container/providers/DateProvider/IDateProvider'
import DateProvider from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider'
import MailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository)
container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ICarRepository>('CarRepository', CarRepository)
container.registerSingleton<ICarImageRepository>('CarImageRepository', CarImageRepository)
container.registerSingleton<IRentalRepository>('RentalRepository', RentalRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
container.registerInstance<IMailProvider>('MailProvider', new MailProvider())
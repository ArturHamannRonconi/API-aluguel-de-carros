import { container } from 'tsyringe'

import ICategoryRepository from '@cars/repositories/interfaces/ICategoryRepository'
import CategoryRepository from '@cars/infra/typeorm/repositories/CategoryRepository'

import ISpecificationRepository from '@cars/repositories/interfaces/ISpecificationRepository'
import SpecificationRepository from '@cars/infra/typeorm/repositories/SpecificationRepository' 

import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'
import UserRepository from '@accounts/infra/typeorm/repositories/UserRepository'

container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository)
container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
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

import IRentalRepository from 'modules/rentals/repositories/interfaces/IRentalRepository'
import RentalRepository from 'modules/rentals/infra/typeorm/repositories/RentalRepository'

container.registerSingleton<ICategoryRepository>('CategoryRepository', CategoryRepository)
container.registerSingleton<ISpecificationRepository>('SpecificationRepository', SpecificationRepository)
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ICarRepository>('CarRepository', CarRepository)
container.registerSingleton<ICarImageRepository>('CarImageRepository', CarImageRepository)
container.registerSingleton<IRentalRepository>('RentalRepository', RentalRepository)
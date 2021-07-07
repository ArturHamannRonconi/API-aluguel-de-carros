import { container } from 'tsyringe'

import IStorageProvider from '@shared/container/providers/StorageProvider/IStorageProvider'
import S3StorageProvider from '@shared/container/providers/StorageProvider/implementations/S3StorageProvider'
import LocalStorageProvider from '@shared/container/providers/StorageProvider/implementations/LocalStorageProvider'

const StorageProvider = {
  dev: LocalStorageProvider,
  prod: S3StorageProvider
} 

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider[process.env.ENVIROMENT]
)
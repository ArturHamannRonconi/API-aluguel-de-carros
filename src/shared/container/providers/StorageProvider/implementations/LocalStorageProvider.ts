import fs from 'fs'
import { resolve } from 'path'

import IStorageProvider from '../IStorageProvider'
import uploadConfig from '@config/UploadConfig'

class LocalStorageProvider implements IStorageProvider
{
  public async save(file: string, folder: string): Promise<string>
  {
    await fs.promises.rename(
      resolve(uploadConfig.destination, file),
      resolve(uploadConfig.destination, folder, file)
    )

    return file
  }

  public async delete(file: string, folder: string): Promise<void>
  {
    const filename = resolve(uploadConfig.destination, folder, file)

    try
    {
      await fs.promises.stat(filename)
    }
    catch
    {
      return undefined
    }

    await fs.promises.unlink(filename)
  }
}

export default LocalStorageProvider
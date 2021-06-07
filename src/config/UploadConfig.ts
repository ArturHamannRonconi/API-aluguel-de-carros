import multer from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'
class UploadConfig
{
  public options(folder: string): multer.Options
  {
    const options =  {
      storage: multer.diskStorage({
        
        destination: resolve(__dirname, '..', '..', folder),
        
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          callback(null, fileName)
        }  
      })
    }

    return options
  }
}

export default new UploadConfig()
import multer, { Options } from 'multer'
import crypto from 'crypto'
import { resolve } from 'path'
class UploadConfig
{
  public destination: string
  public options: Options

  constructor()
  {
    this.destination = resolve(__dirname, '..', '..', 'tmp')
    this.options = {
      storage: multer.diskStorage({
        destination: this.destination,
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          callback(null, fileName)
        }  
      })
    }
  }
}

export default new UploadConfig()
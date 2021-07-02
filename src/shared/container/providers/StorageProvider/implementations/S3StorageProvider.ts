import { S3 } from 'aws-sdk'
import { resolve } from 'path'
import mime from 'mime'
import fs from 'fs'

import IStorageProvider from '../IStorageProvider'
import uploadConfig from '@config/UploadConfig'

class S3StorageProvider implements IStorageProvider
{
  private client: S3

  constructor()
  {
    this.client = new S3({ region: process.env.AWS_BUCKET_REGION })
  }

  public async save(file: string, folder: string): Promise<string>
  {
    const originalName = resolve(uploadConfig.destination, file)
    const fileContent = await this.readFile(originalName)
    const object = this.getObject(file, fileContent, folder)
    
    await this.client.putObject(object).promise()
    await this.deleteTmpFiles(originalName)

    return file
  }

  private async readFile(file: string): Promise<Buffer>
  {
    return fs.promises.readFile(file)
  }

  private getObject(file: string, fileContent: Buffer, folder: string): S3.PutObjectRequest
  {
    const originalName = resolve(uploadConfig.destination, file)
    const ContentType = mime.getType(originalName)

    return {
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType 
    }
  }

  private async deleteTmpFiles(path: string): Promise<void>
  {
    fs.promises.unlink(path)
  }

  public async delete(file: string, folder: string): Promise<void>
  {
    const object = {
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file
    }

    await this.client.deleteObject(object).promise()
  }
}

export default S3StorageProvider
import fs from 'fs' 

class FileUtil
{
  public async deleteFile(fileName: string): Promise<void>
  {
    try {
      await fs.promises.stat(fileName)
    } catch (error) {
      return undefined
    }

    await fs.promises.unlink(fileName)
  }
}

export default FileUtil
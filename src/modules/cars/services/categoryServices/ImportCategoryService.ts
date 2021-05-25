import fs from 'fs'
import csvParse from 'csv-parse'
import { inject, injectable } from 'tsyringe'

import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'
import ImportCategory from '../../@types/ImportCategory'

@injectable()
class ImportCategoryService
{
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {  }

  private loadCategories(file: Express.Multer.File): Promise<ImportCategory[]>
  {
    return new Promise((resolve, reject) => {
      const categories: ImportCategory[] = []
  
      const readStream = fs.createReadStream(file.path)
      const parseFile = csvParse()
  
      readStream.pipe(parseFile)
  
      parseFile
        .on('error', err => reject(err))
        .on('data', async chunk => {
          const [ name, description ] = chunk
          categories.push({ name, description })
        })
        .on('end', () => {
          this.deleteFile(file)
          resolve(categories)
        })
    })
  }

  private deleteFile(file: Express.Multer.File): void
  {
    fs.unlinkSync(file.path)
  }

  public async execute(file: Express.Multer.File): Promise<void>
  {
    const categories = await this.loadCategories(file)

    for await (const category of categories) {
      const { name, description } = category

      const categoryExists = await this.categoryRepository.findByName(name)
      if(categoryExists) throw new Error('400/Category already exists')
      
      await this.categoryRepository.create({ name, description })
    }
  }
}

export default ImportCategoryService
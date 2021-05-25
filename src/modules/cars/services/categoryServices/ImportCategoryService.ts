import fs from 'fs'
import csvParse from 'csv-parse'

import ICategoryRepository from '../../repositories/interfaces/ICategoryRepository'
import ImportCategory from '../../@types/ImportCategory'

class ImportCategoryService
{
  constructor(private categoryRepository: ICategoryRepository) {  }

  private loadCategories(file: Express.Multer.File): Promise<ImportCategory[]>
  {
    return new Promise((resolve, reject) => {
      const categories: ImportCategory[] = []
  
      const readStream = fs.createReadStream(file.path)
      const parseFile = csvParse()
  
      readStream.pipe(parseFile)
  
      parseFile
        .on('end', () => resolve(categories))
        .on('error', err => reject(err))
        .on('data', async chunk => {
          const [ name, description ] = chunk
          categories.push({ name, description })
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
    categories.forEach(async category => {
      const { name, description } = category

      const categoryExists = await this.categoryRepository.findByName(name)
      if(categoryExists) throw new Error('400/Category already exists')

      await this.categoryRepository.create({ name, description })
    })
    
    this.deleteFile(file)
  }
}

export default ImportCategoryService
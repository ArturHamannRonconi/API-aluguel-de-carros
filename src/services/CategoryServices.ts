import { v4 as  generateUUID } from 'uuid'

import { categories } from '../database' 
import Category from '../models/Category'


class CategoryServices
{
  create({ name, description }: Pick<Category, 'name' | 'description'>): Category
  {
    const newCategory: Category = {
      id: generateUUID(),
      name,
      description,
      created_at: new Date()
    }

    categories.push(newCategory)

    return newCategory
  }
}

export default new CategoryServices()
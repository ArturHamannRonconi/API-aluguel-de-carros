import { Request, Response } from 'express'

import categoryServices from '../services/CategoryServices'
import Category from '../models/Category'

class CategoryController
{
  create(req: Request, res: Response): Response
  {
    const { name, description } = req.body as Pick<Category, 'name' | 'description'>

    const newCategory = categoryServices.create({ name, description })
    
    return res.status(201).json(newCategory) 
  }
}

export default new CategoryController()
import { Router } from 'express'

import categoryRepository from '../repositories/CategoryRepository'

const categoriesRoutes = Router()

categoriesRoutes.route('/categories')
  .post((req, res) => {
    const { name, description } = req.body

    const categoryAlreadyExists = categoryRepository.findByName(name)
    if(categoryAlreadyExists)
      return res.status(400).json({ message: 'Category already exists' })

    categoryRepository.create({ name, description })

    return res.status(201).end()
  })
  .get((req, res) => {
    const categories = categoryRepository.list()

    return res.status(200).json(categories)
  })

export default categoriesRoutes
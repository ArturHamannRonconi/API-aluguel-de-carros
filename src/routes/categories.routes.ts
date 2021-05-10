import { Router } from 'express'

const categoriesRoutes = Router()
const categories = []


categoriesRoutes.post('/categories', (req, res) => {
  const { name, description } = req.body

  const newCategory = {
    name,
    description
  }

  categories.push(newCategory)
  
  return res.status(201).json(newCategory) 
})

export default categoriesRoutes
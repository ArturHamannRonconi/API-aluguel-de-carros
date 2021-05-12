import { v4 as generateUUID } from 'uuid'

class Category
{
  name: string
  description: string
  id?: string
  created_at: Date

  constructor()
  {
    if(!this.id) this.id = generateUUID()
  }
}

export default Category
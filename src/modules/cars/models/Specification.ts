import { v4 as generateUUID } from 'uuid'

class Specification
{
  id?: string
  name: string
  description: string
  created_at: Date
  
  constructor()
  {
    if(!this.id) this.id = generateUUID()
  }
}

export default Specification





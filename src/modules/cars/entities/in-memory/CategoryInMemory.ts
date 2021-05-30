import ICategory from '../interfaces/ICategory'

class CategoryInMemory implements ICategory
{
  id: string;
  name: string;
  description: string;
  created_at: Date;
  
}

export default CategoryInMemory
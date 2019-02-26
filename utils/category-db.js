import Category from '../models/category';

export async function getAllCategoriesDB() {
  const categoriesDB = await Category.find()
    .sort('name')
    .populate('user', 'name email');
  return categoriesDB;
}

export async function getCategoryDB(id) {
  const categoryDB = await Category.findById(id);

  if (!categoryDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }
  return categoryDB;
}

export async function createCategoryDB(category) {
  const newCategory = new Category(category);

  const categoryDB = await newCategory.save();
  return categoryDB;
}

export async function updateCategoryDB(id, body) {
  const categoryDB = await Category.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
    context: 'query'
  });

  if (!categoryDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }

  return categoryDB;
}

export async function removeCategoryDB(id) {
  const categoryDB = await Category.findByIdAndRemove(id);

  if (!categoryDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }

  return categoryDB;
}

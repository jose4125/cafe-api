import {
  createCategoryDB,
  getAllCategoriesDB,
  getCategoryDB,
  updateCategoryDB,
  removeCategoryDB
} from '../utils/category-db';

export async function getAllCategories(req, res) {
  console.log('getAllCategories =============');
  try {
    const categories = await getAllCategoriesDB();

    res.json({
      ok: true,
      categories
    });
  } catch (err) {
    res.status(404).json({
      ok: false,
      err: {
        message: err.message
      }
    });
  }
}

export async function getCategory(req, res) {
  const { id } = req.params;
  const category = await getCategoryDB(id);
  res.json({
    ok: true,
    category
  });
}

export async function createCategory(req, res) {
  const { name } = req.body;
  const category = {
    name,
    user: req.user._id
  };

  const categoryDB = await createCategoryDB(category);
  res.status(201).json({
    ok: true,
    category: categoryDB
  });
}

export async function updateCategory(req, res) {
  const { id } = req.params;
  const body = req.body;
  const category = await updateCategoryDB(id, body);
  res.json({
    ok: true,
    category
  });
}

export async function deleteCategory(req, res) {
  const { id } = req.params;
  const category = await removeCategoryDB(id);
  res.json({
    ok: true,
    category
  });
}

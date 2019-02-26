import {
  createProductDB,
  getAllProductsDB,
  getProductDB,
  updateProductDB,
  deleteProductDB,
  searchProductDB
} from '../utils/product-db';

export async function getAllProducts(req, res) {
  const { start = 0, limit = 5 } = req.query;

  const products = await getAllProductsDB(start, limit);
  res.json({
    ok: true,
    products
  });
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await getProductDB(id);
  res.json({
    ok: true,
    product
  });
}

export async function searchProduct(req, res) {
  const { term } = req.params;
  const products = await searchProductDB(term);
  res.json({
    ok: true,
    products
  });
}

export async function createProduct(req, res) {
  const { name, price, description, inStock, category } = req.body;
  const newProduct = {
    name,
    price,
    description,
    inStock,
    category,
    user: req.user._id
  };

  const product = await createProductDB(newProduct);
  res.status(201).json({
    ok: true,
    product
  });
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const body = req.body;
  const product = await updateProductDB(id, body);

  res.json({
    ok: true,
    product
  });
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  const product = await deleteProductDB(id);

  res.json({
    ok: true,
    product
  });
}

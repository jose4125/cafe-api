import Product from '../models/product';

export async function getAllProductsDB(start, limit) {
  const productsDB = await Product.find({ inStock: true })
    .skip(parseInt(start, 10))
    .limit(parseInt(limit, 10))
    .populate('category', 'name')
    .populate('user', 'name email');

  return productsDB;
}

export async function getProductDB(id) {
  const productDB = await Product.findById(id)
    .populate('user', 'name email')
    .populate('category', 'name');

  if (!productDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }

  return productDB;
}

export async function searchProductDB(term) {
  const regexTerm = new RegExp(term, 'i');
  const productsDB = await Product.find({ name: regexTerm, inStock: true })
    .populate('user', 'name email')
    .populate('category', 'name');
  return productsDB;
}

export async function createProductDB(product) {
  const newProduct = new Product(product);
  const productDB = newProduct.save();

  return productDB;
}

export async function updateProductDB(id, body) {
  const productDB = await Product.findById(id);

  if (!productDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }

  productDB.name = body.name;
  productDB.price = body.price;
  productDB.category = body.category;
  productDB.inStock = body.inStock;
  productDB.description = body.description;

  const updatedProduct = await productDB.save();
  return updatedProduct;
}

export async function deleteProductDB(id) {
  const productDB = await Product.findById(id);

  if (!productDB) {
    throw { name: 'ValidationError', message: 'invalid id' };
  }

  productDB.inStock = false;

  const deletedProduct = await productDB.save();
  return deletedProduct;
}

import express from 'express';
import checkAdminRole from '../middlewares/check-admin-role';
import { catchErrors } from '../middlewares/catch-errors';

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct
} from '../controllers/productController';

const router = express.Router();

router.get('/', catchErrors(getAllProducts));
router.get('/:id', catchErrors(getProduct));
router.get('/search/:term', catchErrors(searchProduct));
router.post('/', catchErrors(createProduct));
router.put('/:id', catchErrors(updateProduct));
router.delete('/:id', checkAdminRole, catchErrors(deleteProduct));

export default router;

import express from 'express';
import checkAdminRole from '../middlewares/check-admin-role';
import { catchErrors } from '../middlewares/catch-errors';

import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController';

const router = express.Router();
router.get('/', catchErrors(getAllCategories));
router.get('/:id', catchErrors(getCategory));
router.post('/', catchErrors(createCategory));
router.put('/:id', catchErrors(updateCategory));
router.delete('/:id', checkAdminRole, catchErrors(deleteCategory));

export default router;

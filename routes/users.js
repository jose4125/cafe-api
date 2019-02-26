import express from 'express';

import checkAdminRole from '../middlewares/check-admin-role';

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', checkAdminRole, updateUser);
router.delete('/:id', checkAdminRole, deleteUser);

export default router;

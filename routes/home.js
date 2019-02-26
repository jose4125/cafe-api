import express from 'express';

import { showHome } from '../controllers/homeController';

const router = express.Router();

/* GET users listing. */
router.get('/', showHome);

export default router;

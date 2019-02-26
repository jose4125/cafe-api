import express from 'express';

import { getImage } from '../controllers/imageController';

const router = express.Router();

router.get('/:type/:img', getImage);

export default router;

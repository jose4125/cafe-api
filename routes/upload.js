import express from 'express';

import { catchErrors } from '../middlewares/catch-errors';
import { uploadFile } from '../controllers/uploadController';

const router = express.Router();

router.put('/:type/:id', catchErrors(uploadFile));

export default router;

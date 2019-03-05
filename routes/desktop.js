import express from 'express';
import { desktop } from '../controllers/desktopController';

const router = express.Router();

router.get('/', desktop);

export default router;

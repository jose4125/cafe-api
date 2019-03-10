import express from 'express';
import { chat, indexChat } from '../controllers/chatController';
import { catchErrors } from '../middlewares/catch-errors';

const router = express.Router();

router.get('/', catchErrors(indexChat));
router.get('/room', catchErrors(chat));

export default router;

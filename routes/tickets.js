import express from 'express';
import { tickets } from '../controllers/ticketController';
import { catchErrors } from '../middlewares/catch-errors';

const router = express.Router();

router.get('/', catchErrors(tickets));

export default router;

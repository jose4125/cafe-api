import express from 'express';
import { newTicket } from '../controllers/ticketController';

const router = express.Router();

router.get('/', newTicket);

export default router;

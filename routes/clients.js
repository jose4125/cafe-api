import express from 'express';
import { clients } from '../controllers/clientsController';

const router = express.Router();

router.get('/', clients);

export default router;

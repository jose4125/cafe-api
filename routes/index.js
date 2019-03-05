import express from 'express';

import usersRouter from './users';
import authRouter from './auth';
import homeRouter from './home';
import categoryRouter from './category';
import productRouter from './product';
import uploadRouter from './upload';
import imageRouter from './images';
import ticketsRouter from './tickets';
import publicClientsRouter from './clients';
import desktopRouter from './desktop';
import newTicketRouter from './new-ticket';
import checkAuth from '../middlewares/check-authentication';

let app = express();

app.use('/', homeRouter);
app.use('/user', checkAuth, usersRouter);
app.use('/auth', authRouter);
app.use('/category', checkAuth, categoryRouter);
app.use('/product', checkAuth, productRouter);
app.use('/upload', checkAuth, uploadRouter);
app.use('/image', checkAuth, imageRouter);
app.use('/tickets', ticketsRouter);
app.use('/clients', publicClientsRouter);
app.use('/desktop', desktopRouter);
app.use('/new-ticket', newTicketRouter);

export default app;

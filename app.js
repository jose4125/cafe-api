import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import passport from 'passport';
import fileUpload from 'express-fileupload';
import {
  googleStrategyPassport,
  serializeUser,
  deserializeUser
} from './utils/passport';
import Db from './utils/db';
import { getDatabaseUrl } from './config/config';
import routes from './routes/index';
import { errorHandler } from './middlewares/catch-errors';
// import dotenv from 'dotenv';

// dotenv.config({ path: 'variables.env' });
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
console.log('connect database');
Db(getDatabaseUrl()).connect();

app.use(passport.initialize());

app.use(routes);

passport.use(googleStrategyPassport);
passport.deserializeUser(deserializeUser);
passport.serializeUser(serializeUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;

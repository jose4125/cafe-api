import express from 'express';
import passport from 'passport';

import {
  authController,
  googleAuth,
  googlePlusRedirect
} from '../controllers/authController';

const router = express.Router();

router.post('/', authController);
router.post('/google', googleAuth);
router.get(
  '/googleplus',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
router.get(
  '/googleplus/redirect',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  googlePlusRedirect
);

export default router;

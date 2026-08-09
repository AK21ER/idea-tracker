import { Router } from 'express';
import passport from 'passport';
import { register, login, getAccount, googleCallback } from '../controllers/user';
import { registerValidator, loginValidator } from '../validators/user.validator';
import { parseValidationErrors } from '../validators/errors.parser';
import { authenticateJwt } from '../controllers/middlewares';

const router = Router();

router.post('/register', registerValidator, parseValidationErrors, register);
router.post('/login', loginValidator, parseValidationErrors, login);
router.get('/account', authenticateJwt, getAccount);

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/users/auth/google/failure' }),
  googleCallback
);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'], session: false })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/api/users/auth/facebook/failure' }),
  googleCallback // reuse the same handler — it's provider-agnostic, just signs a token for req.user
);

export default router;
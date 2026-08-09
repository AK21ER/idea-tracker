import { Router } from 'express';
import passport from 'passport';
import {
  register,
  login,
  getAccount,
  oauthCallback,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user';
import { 
  registerValidator, 
  loginValidator,
  userIdValidator,
  updateUserValidator 
} from '../validators/user.validator';
import { parseValidationErrors } from '../validators/errors.parser';
import { authenticateJwt, requireAdmin } from '../controllers/middlewares';

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
    oauthCallback,

);

router.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'], session: false })
);

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/api/users/auth/facebook/failure' }),
    oauthCallback,
// reuse the same handler — it's provider-agnostic, just signs a token for req.user
);

router.get('/', authenticateJwt, requireAdmin, getAllUsers);
router.get('/:id', authenticateJwt, requireAdmin, userIdValidator, parseValidationErrors, getUserById);
router.patch('/:id', authenticateJwt, requireAdmin, updateUserValidator, parseValidationErrors, updateUser);
router.delete('/:id', authenticateJwt, requireAdmin, userIdValidator, parseValidationErrors, deleteUser);

export default router;
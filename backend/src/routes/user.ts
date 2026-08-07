import { Router } from 'express';
import { register, login, getAccount } from '../controllers/user';
import { registerValidator, loginValidator } from '../validators/user.validator';
import { parseValidationErrors } from '../validators/errors.parser';
import { authenticateJwt } from '../controllers/middlewares';

const router = Router();

router.post('/register', registerValidator, parseValidationErrors, register);
router.post('/login', loginValidator, parseValidationErrors, login);
router.get('/account', authenticateJwt, getAccount);

export default router;
import { Router } from 'express';
import testRoutes from '../routes/test';
import userRoutes from '../routes/user';

const router = Router();

router.use('/test', testRoutes);
router.use('/users', userRoutes);

export default router;
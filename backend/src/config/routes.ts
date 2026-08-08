import { Router } from 'express';
import testRoutes from '../routes/test';
import userRoutes from '../routes/user';
import ideaRoutes from '../routes/idea';

const router = Router();

router.use('/test', testRoutes);
router.use('/users', userRoutes);
router.use('/ideas', ideaRoutes);

export default router;
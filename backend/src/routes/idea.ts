import { Router } from 'express';
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
} from '../controllers/idea';
import {
  createIdeaValidator,
  updateIdeaValidator,
  ideaIdValidator,
} from '../validators/idea.validator';
import { parseValidationErrors } from '../validators/errors.parser';
import { authenticateJwt } from '../controllers/middlewares';

const router = Router();

router.use(authenticateJwt); // every idea route requires a logged-in user

router.post('/', createIdeaValidator, parseValidationErrors, createIdea);
router.get('/', getIdeas);
router.get('/:id', ideaIdValidator, parseValidationErrors, getIdeaById);
router.patch('/:id', updateIdeaValidator, parseValidationErrors, updateIdea);
router.delete('/:id', ideaIdValidator, parseValidationErrors, deleteIdea);

export default router;
import express from 'express';
import * as movieController from '../controllers/movie.js';
import authenticateWithJwt from '../middleware/authenticateWithJwt.js';
import validateMongoId from '../middleware/validateMongoId.js';
import validatePaginationParams from '../middleware/validatePaginationParams.js';

const router = express.Router();

router.get('/', validatePaginationParams, movieController.getAll);
router.get('/:id', validateMongoId, movieController.getById);
router.post('/', authenticateWithJwt, movieController.create);
router.put('/:id', authenticateWithJwt, validateMongoId, movieController.update);
router.delete('/:id', authenticateWithJwt, validateMongoId, movieController.remove);

export default router;

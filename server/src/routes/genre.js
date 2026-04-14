import express from 'express';
import * as genreController from '../controllers/genre.js';
import authenticateWithJwt from '../middleware/authenticateWithJwt.js';
import validateMongoId from '../middleware/validateMongoId.js';
import validatePaginationParams from '../middleware/validatePaginationParams.js';

const router = express.Router();

router.get('/', validatePaginationParams, genreController.getAll);
router.get('/:id', validateMongoId, genreController.getById);
router.post('/', authenticateWithJwt, genreController.create);
router.put('/:id', authenticateWithJwt, validateMongoId, genreController.update);
router.delete('/:id', authenticateWithJwt, validateMongoId, genreController.remove);

export default router;

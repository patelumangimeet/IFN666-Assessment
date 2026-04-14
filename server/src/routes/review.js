import express from 'express';
import * as reviewController from '../controllers/review.js';
import authenticateWithJwt from '../middleware/authenticateWithJwt.js';
import validateMongoId from '../middleware/validateMongoId.js';
import validatePaginationParams from '../middleware/validatePaginationParams.js';

const router = express.Router();

router.get('/', validatePaginationParams, reviewController.getAll);
router.get('/:id', validateMongoId, reviewController.getById);
router.post('/', authenticateWithJwt, reviewController.create);
router.put('/:id', authenticateWithJwt, validateMongoId, reviewController.update);
router.delete('/:id', authenticateWithJwt, validateMongoId, reviewController.remove);

export default router;

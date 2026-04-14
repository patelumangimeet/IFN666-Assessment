import express from 'express';
import authRoutes from './auth.js';
import genreRoutes from './genre.js';
import movieRoutes from './movie.js';
import reviewRoutes from './review.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/genres', genreRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);

export default router;

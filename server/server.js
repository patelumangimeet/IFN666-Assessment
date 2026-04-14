import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './src/routes/index.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'CineTrack API',
    version: '1.0.0',
    description: 'Movie watchlist and review web application',
    endpoints: {
      auth: '/api/auth/register, /api/auth/login',
      genres: '/api/genres',
      movies: '/api/movies',
      reviews: '/api/reviews'
    },
    documentation: 'See README.md for full API documentation',
    status: 'Live and operational'
  });
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 1000
  },
  releaseYear: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  status: {
    type: String,
    enum: ['watchlist', 'watched', 'abandoned'],
    default: 'watchlist'
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Movie', movieSchema);

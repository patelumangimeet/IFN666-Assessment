import mongoose from 'mongoose';

export default function validateMongoId(req, res, next) {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, error: 'Invalid ID format' });
  }

  next();
}

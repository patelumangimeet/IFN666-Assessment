import Review from '../models/review.js';

export const getAll = async (req, res) => {
  try {
    const { page, limit } = req.pagination;
    const { movie } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (movie) {
      filter.movie = movie;
    }

    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
      .populate('movie', 'title')
      .populate('author', 'username')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(total / limit);

    const queryString = new URLSearchParams({
      ...(movie && { movie }),
      limit
    }).toString();

    // Build Link header for RFC 8288 pagination
    let linkHeader = `<${process.env.API_BASE_URL || 'http://localhost:5000'}/api/reviews?page=${page}&${queryString}>; rel="self"`;
    if (page < totalPages) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/reviews?page=${page + 1}&${queryString}>; rel="next"`;
    }
    if (page > 1) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/reviews?page=${page - 1}&${queryString}>; rel="prev"`;
    }

    return res.set('Link', linkHeader).status(200).json({
      success: true,
      data: reviews,
      pagination: { page, limit, total, pages: totalPages }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('movie', 'title')
      .populate('author', 'username');

    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    return res.status(200).json({ success: true, data: review });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { content, score, movie } = req.body;

    if (!content || !score || !movie) {
      return res.status(400).json({ success: false, error: 'Content, score, and movie are required' });
    }

    if (content.length < 10) {
      return res.status(400).json({ success: false, error: 'Review must be at least 10 characters' });
    }

    if (score < 1 || score > 10 || !Number.isInteger(score)) {
      return res.status(400).json({ success: false, error: 'Score must be an integer between 1 and 10' });
    }

    const review = new Review({
      content,
      score,
      movie,
      author: req.userId
    });

    await review.save();
    await review.populate('movie', 'title');
    await review.populate('author', 'username');

    return res.status(201).json({ 
      success: true, 
      message: 'Review created successfully',
      data: review 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { content, score } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    if (review.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    if (content) {
      if (content.length < 10) {
        return res.status(400).json({ success: false, error: 'Review must be at least 10 characters' });
      }
      review.content = content;
    }

    if (score) {
      if (score < 1 || score > 10 || !Number.isInteger(score)) {
        return res.status(400).json({ success: false, error: 'Score must be an integer between 1 and 10' });
      }
      review.score = score;
    }

    review.updatedAt = Date.now();
    await review.save();
    await review.populate('movie', 'title');
    await review.populate('author', 'username');

    return res.status(200).json({ 
      success: true, 
      message: 'Review updated successfully',
      data: review 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }

    if (review.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await Review.findByIdAndDelete(req.params.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Review deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

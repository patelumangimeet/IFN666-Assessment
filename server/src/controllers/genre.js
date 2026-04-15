import Genre from '../models/genre.js';

export const getAll = async (req, res) => {
  try {
    const { page, limit } = req.pagination;
    const skip = (page - 1) * limit;

    const total = await Genre.countDocuments();
    const genres = await Genre.find()
      .populate('author', 'username')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(total / limit);

    // Build Link header for RFC 8288 pagination
    let linkHeader = `<${process.env.API_BASE_URL || 'http://localhost:5000'}/api/genres?page=${page}&limit=${limit}>; rel="self"`;
    if (page < totalPages) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/genres?page=${page + 1}&limit=${limit}>; rel="next"`;
    }
    if (page > 1) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/genres?page=${page - 1}&limit=${limit}>; rel="prev"`;
    }

    return res.set('Link', linkHeader).status(200).json({
      success: true,
      data: genres,
      pagination: { page, limit, total, pages: totalPages }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate('author', 'username');

    if (!genre) {
      return res.status(404).json({ success: false, error: 'Genre not found' });
    }

    return res.status(200).json({ success: true, data: genre });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }

    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(409).json({ success: false, error: 'Genre already exists' });
    }

    const genre = new Genre({
      name,
      description,
      author: req.userId
    });

    await genre.save();
    await genre.populate('author', 'username');

    return res.status(201).json({ 
      success: true, 
      message: 'Genre created successfully',
      data: genre 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { name, description } = req.body;

    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ success: false, error: 'Genre not found' });
    }

    if (genre.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    if (name) genre.name = name;
    if (description) genre.description = description;
    genre.updatedAt = Date.now();

    await genre.save();
    await genre.populate('author', 'username');

    return res.status(200).json({ 
      success: true, 
      message: 'Genre updated successfully',
      data: genre 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      return res.status(404).json({ success: false, error: 'Genre not found' });
    }

    if (genre.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await Genre.findByIdAndDelete(req.params.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Genre deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

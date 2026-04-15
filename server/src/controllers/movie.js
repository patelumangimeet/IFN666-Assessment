import Movie from '../models/movie.js';

export const getAll = async (req, res) => {
  try {
    const { page, limit } = req.pagination;
    const { search, genre, status, sortBy, order } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    if (genre) {
      filter.genre = genre;
    }
    if (status) {
      filter.status = status;
    }

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1;
    }

    const total = await Movie.countDocuments(filter);
    const movies = await Movie.find(filter)
      .populate('genre', 'name')
      .populate('author', 'username')
      .skip(skip)
      .limit(limit)
      .sort(sortOptions);

    const totalPages = Math.ceil(total / limit);

    const queryString = new URLSearchParams({
      ...(search && { search }),
      ...(genre && { genre }),
      ...(status && { status }),
      ...(sortBy && { sortBy }),
      ...(order && { order }),
      limit
    }).toString();

    // Build Link header for RFC 8288 pagination
    let linkHeader = `<${process.env.API_BASE_URL || 'http://localhost:5000'}/api/movies?page=${page}&${queryString}>; rel="self"`;
    if (page < totalPages) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/movies?page=${page + 1}&${queryString}>; rel="next"`;
    }
    if (page > 1) {
      linkHeader += `, <${process.env.API_BASE_URL || 'http://localhost:5000'}/api/movies?page=${page - 1}&${queryString}>; rel="prev"`;
    }

    return res.set('Link', linkHeader).status(200).json({
      success: true,
      data: movies,
      pagination: { page, limit, total, pages: totalPages }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('genre', 'name')
      .populate('author', 'username');

    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    return res.status(200).json({ success: true, data: movie });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { title, description, releaseYear, genre, status, rating } = req.body;

    if (!title || !releaseYear || !genre) {
      return res.status(400).json({ success: false, error: 'Title, release year, and genre are required' });
    }

    if (releaseYear < 1800 || releaseYear > new Date().getFullYear()) {
      return res.status(400).json({ success: false, error: 'Invalid release year' });
    }

    const movie = new Movie({
      title,
      description,
      releaseYear,
      genre,
      status: status || 'watchlist',
      rating: rating || null,
      author: req.userId
    });

    await movie.save();
    await movie.populate('genre', 'name');
    await movie.populate('author', 'username');

    return res.status(201).json({ 
      success: true, 
      message: 'Movie created successfully',
      data: movie 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { title, description, releaseYear, genre, status, rating } = req.body;

    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    if (movie.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    if (title) movie.title = title;
    if (description) movie.description = description;
    if (releaseYear) movie.releaseYear = releaseYear;
    if (genre) movie.genre = genre;
    if (status) movie.status = status;
    if (rating !== undefined) movie.rating = rating;
    movie.updatedAt = Date.now();

    await movie.save();
    await movie.populate('genre', 'name');
    await movie.populate('author', 'username');

    return res.status(200).json({ 
      success: true, 
      message: 'Movie updated successfully',
      data: movie 
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found' });
    }

    if (movie.author.toString() !== req.userId) {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    await Movie.findByIdAndDelete(req.params.id);

    return res.status(200).json({ 
      success: true, 
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

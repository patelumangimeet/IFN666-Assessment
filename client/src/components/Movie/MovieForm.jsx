import { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, TextInput, NumberInput, Select, Button, Group } from '@mantine/core';

export default function MovieForm({ genres, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('watchlist');
  const [rating, setRating] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/genres?limit=100`);
      setGenreList(res.data.data.map(g => ({ value: g._id, label: g.name })));
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/movies`,
        {
          title,
          description,
          releaseYear: parseInt(releaseYear),
          genre,
          status,
          rating: rating ? parseInt(rating) : null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create movie');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <Stack>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <NumberInput
          label="Release Year"
          value={releaseYear}
          onChange={(val) => setReleaseYear(val)}
          required
        />
        <Select
          label="Genre"
          placeholder="Select a genre"
          data={genreList}
          value={genre}
          onChange={(val) => setGenre(val)}
          required
        />
        <Select
          label="Status"
          data={[
            { value: 'watchlist', label: 'Watchlist' },
            { value: 'watched', label: 'Watched' }
          ]}
          value={status}
          onChange={(val) => setStatus(val)}
        />
        <NumberInput
          label="Rating (1-10)"
          value={rating}
          onChange={(val) => setRating(val)}
          min={1}
          max={10}
        />
        <Group>
          <Button type="submit">Add Movie</Button>
        </Group>
      </Stack>
    </form>
  );
}

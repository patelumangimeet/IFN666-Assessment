import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Button, Stack, Text, Group, Select, TextInput, Pagination } from '@mantine/core';
import MovieList from '../components/Movie/MovieList';
import MovieForm from '../components/Movie/MovieForm';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [page, search, selectedGenre, status, sortBy, order]);

  const fetchMovies = async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
        ...(selectedGenre && { genre: selectedGenre }),
        ...(status && { status }),
        sortBy,
        order
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies?${params}`);
      setMovies(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/genres?limit=100`);
      setGenres(res.data.data.map(g => ({ value: g._id, label: g.name })));
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const handleMovieAdded = () => {
    setShowForm(false);
    setPage(1);
    fetchMovies();
  };

  const handleMovieDeleted = () => {
    fetchMovies();
  };

  return (
    <Container size="lg" style={{ marginTop: 20 }}>
      <Group justify="space-between" style={{ marginBottom: 20 }}>
        <Title order={2}>Movies</Title>
        {token && <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Movie'}
        </Button>}
      </Group>

      {showForm && <MovieForm onSuccess={handleMovieAdded} />}

      <Stack style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Group>
          <Select
            label="Genre"
            placeholder="All genres"
            data={genres}
            searchable
            value={selectedGenre}
            onChange={(val) => {
              setSelectedGenre(val);
              setPage(1);
            }}
            style={{ flex: 1 }}
          />
          <Select
            label="Status"
            placeholder="All statuses"
            data={[
              { value: 'watched', label: 'Watched' },
              { value: 'watchlist', label: 'Watchlist' }
            ]}
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            style={{ flex: 1 }}
          />
          <Select
            label="Sort By"
            data={[
              { value: 'createdAt', label: 'Newest' },
              { value: 'title', label: 'Title' },
              { value: 'releaseYear', label: 'Release Year' },
              { value: 'rating', label: 'Rating' }
            ]}
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            style={{ flex: 1 }}
          />
          <Select
            label="Order"
            data={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' }
            ]}
            value={order}
            onChange={(val) => setOrder(val)}
            style={{ flex: 1 }}
          />
        </Group>
      </Stack>

      <MovieList movies={movies} onDelete={handleMovieDeleted} />

      {totalPages > 1 && (
        <Group justify="center" style={{ marginTop: 20 }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </Group>
      )}
    </Container>
  );
}

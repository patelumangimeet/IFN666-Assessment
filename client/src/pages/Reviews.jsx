import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Pagination, Group, Select } from '@mantine/core';
import ReviewList from '../components/Review/ReviewList';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    fetchReviews();
    fetchMovies();
  }, [page, selectedMovie]);

  const fetchReviews = async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(selectedMovie && { movie: selectedMovie })
      });
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews?${params}`);
      setReviews(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/movies?limit=100`);
      setMovies(res.data.data.map(m => ({ value: m._id, label: m.title })));
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  return (
    <Container size="lg" style={{ marginTop: 20 }}>
      <Title order={2} style={{ marginBottom: 20 }}>Reviews</Title>

      <Select
        label="Filter by Movie"
        placeholder="All movies"
        data={movies}
        searchable
        value={selectedMovie}
        onChange={(val) => {
          setSelectedMovie(val);
          setPage(1);
        }}
        style={{ marginBottom: 20 }}
      />

      <ReviewList reviews={reviews} onDelete={() => fetchReviews()} />

      {totalPages > 1 && (
        <Group justify="center" style={{ marginTop: 20 }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </Group>
      )}
    </Container>
  );
}

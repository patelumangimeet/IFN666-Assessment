import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Title, Button, Stack, Pagination, Group } from '@mantine/core';
import GenreList from '../components/Genre/GenreList';
import GenreForm from '../components/Genre/GenreForm';

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchGenres();
  }, [page]);

  const fetchGenres = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/genres?page=${page}&limit=10`);
      setGenres(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const handleGenreAdded = () => {
    setShowForm(false);
    setPage(1);
    fetchGenres();
  };

  const handleGenreDeleted = () => {
    fetchGenres();
  };

  return (
    <Container size="lg" style={{ marginTop: 20 }}>
      <Group justify="space-between" style={{ marginBottom: 20 }}>
        <Title order={2}>Genres</Title>
        {token && <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Genre'}
        </Button>}
      </Group>

      {showForm && <GenreForm onSuccess={handleGenreAdded} />}

      <GenreList genres={genres} onDelete={handleGenreDeleted} />

      {totalPages > 1 && (
        <Group justify="center" style={{ marginTop: 20 }}>
          <Pagination total={totalPages} value={page} onChange={setPage} />
        </Group>
      )}
    </Container>
  );
}

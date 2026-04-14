import { Card, Button, Badge, Group, Text, Stack, NumberInput, Select } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

export default function MovieCard({ movie, onDelete }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(movie.status);
  const [rating, setRating] = useState(movie.rating || '');

  const canEdit = token && userId === movie.author._id;

  const handleDelete = async () => {
    if (window.confirm('Delete this movie?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/movies/${movie._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete();
      } catch (err) {
        console.error('Error deleting movie:', err);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/movies/${movie._id}`,
        {
          status,
          rating: rating ? parseInt(rating) : null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      onDelete();
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: 15 }}>
      <Group justify="space-between" style={{ marginBottom: 10 }}>
        <Text weight={500}>{movie.title}</Text>
        <Badge color={movie.status === 'watched' ? 'green' : 'blue'}>
          {movie.status}
        </Badge>
      </Group>

      <Stack gap="xs" style={{ marginBottom: 10 }}>
        <Text size="sm" color="dimmed">{movie.description}</Text>
        <Group>
          <Text size="sm"><strong>Year:</strong> {movie.releaseYear}</Text>
          <Text size="sm"><strong>Genre:</strong> {movie.genre?.name}</Text>
          {movie.rating && <Text size="sm"><strong>Rating:</strong> {movie.rating}/10</Text>}
        </Group>
      </Stack>

      {isEditing && canEdit ? (
        <Stack gap="xs">
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
            label="Rating"
            value={rating}
            onChange={(val) => setRating(val)}
            min={1}
            max={10}
          />
          <Group>
            <Button size="xs" onClick={handleUpdate}>Save</Button>
            <Button size="xs" variant="light" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Group>
        </Stack>
      ) : (
        canEdit && (
          <Group>
            <Button size="xs" onClick={() => setIsEditing(true)}>Edit</Button>
            <Button size="xs" color="red" onClick={handleDelete}>Delete</Button>
          </Group>
        )
      )}
    </Card>
  );
}

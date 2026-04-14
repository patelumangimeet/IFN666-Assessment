import { Card, Button, Group, Text, Stack } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

export default function GenreCard({ genre, onDelete }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(genre.name);
  const [description, setDescription] = useState(genre.description || '');

  const canEdit = token && userId === genre.author._id;

  const handleDelete = async () => {
    if (window.confirm('Delete this genre?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/genres/${genre._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete();
      } catch (err) {
        console.error('Error deleting genre:', err);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/genres/${genre._id}`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      onDelete();
    } catch (err) {
      console.error('Error updating genre:', err);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: 15 }}>
      <Group justify="space-between" style={{ marginBottom: 10 }}>
        <Text weight={500}>{genre.name}</Text>
      </Group>

      {isEditing && canEdit ? (
        <Stack gap="xs">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Genre name"
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          />
          <Group>
            <Button size="xs" onClick={handleUpdate}>Save</Button>
            <Button size="xs" variant="light" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Group>
        </Stack>
      ) : (
        <>
          <Text size="sm" color="dimmed">{genre.description}</Text>
          {canEdit && (
            <Group style={{ marginTop: 10 }}>
              <Button size="xs" onClick={() => setIsEditing(true)}>Edit</Button>
              <Button size="xs" color="red" onClick={handleDelete}>Delete</Button>
            </Group>
          )}
        </>
      )}
    </Card>
  );
}

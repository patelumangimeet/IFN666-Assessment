import { Card, Button, Badge, Group, Text, Stack } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';

export default function ReviewCard({ review, onDelete }) {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(review.content);
  const [score, setScore] = useState(review.score);

  const canEdit = token && userId === review.author._id;

  const handleDelete = async () => {
    if (window.confirm('Delete this review?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${review._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onDelete();
      } catch (err) {
        console.error('Error deleting review:', err);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/reviews/${review._id}`,
        { content, score: parseInt(score) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      onDelete();
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ marginBottom: 15 }}>
      <Group justify="space-between" style={{ marginBottom: 10 }}>
        <Text weight={500}>{review.movie?.title}</Text>
        <Badge>{review.score}/10</Badge>
      </Group>

      {isEditing && canEdit ? (
        <Stack gap="xs">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd', minHeight: 80 }}
          />
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            min={1}
            max={10}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
          />
          <Group>
            <Button size="xs" onClick={handleUpdate}>Save</Button>
            <Button size="xs" variant="light" onClick={() => setIsEditing(false)}>Cancel</Button>
          </Group>
        </Stack>
      ) : (
        <>
          <Text size="sm">{content}</Text>
          <Text size="xs" color="dimmed" style={{ marginTop: 10 }}>
            by {review.author?.username}
          </Text>
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

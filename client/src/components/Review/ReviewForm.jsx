import { useState } from 'react';
import axios from 'axios';
import { Stack, TextInput, NumberInput, Button } from '@mantine/core';

export default function ReviewForm({ movieId, onSuccess }) {
  const [content, setContent] = useState('');
  const [score, setScore] = useState(5);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        { movie: movieId, content, score: parseInt(score) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create review');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <Stack>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review..."
          style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd', minHeight: 100 }}
          required
        />
        <NumberInput
          label="Score (1-10)"
          value={score}
          onChange={(val) => setScore(val)}
          min={1}
          max={10}
          required
        />
        <Button type="submit">Post Review</Button>
      </Stack>
    </form>
  );
}

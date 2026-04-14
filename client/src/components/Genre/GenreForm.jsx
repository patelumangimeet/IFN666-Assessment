import { useState } from 'react';
import axios from 'axios';
import { Stack, TextInput, Button } from '@mantine/core';

export default function GenreForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/genres`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create genre');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <Stack>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <TextInput
          label="Genre Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Add Genre</Button>
      </Stack>
    </form>
  );
}

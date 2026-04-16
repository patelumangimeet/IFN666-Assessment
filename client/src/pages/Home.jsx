import { Button, Container, Title, Text, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container 
      size="md" 
      style={{ 
        marginTop: 60,
        padding: '40px 20px'
      }}
    >
      <Stack align="center" justify="center" gap="lg">
        <Title order={1} style={{ fontSize: 40 }}>🎬 CineTrack</Title>
        <Text size="lg" style={{ color: '#666' }}>Your personal movie watchlist manager</Text>
        
        <Stack gap="xs" style={{ marginTop: 20, maxWidth: 500, textAlign: 'center' }}>
          <Text size="md" style={{ color: '#666' }}>
            Organize your movies by genre, track watch status, and share reviews with ratings.
          </Text>
          <Text size="sm" style={{ color: '#999' }}>
            ✓ Organize by genre  |  ✓ Track movies  |  ✓ Write reviews  |  ✓ Rate movies
          </Text>
        </Stack>
        
        <Stack style={{ marginTop: 40, width: '100%', maxWidth: 400 }}>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="md" color="blue">Browse Movies</Button>
          </Link>
          <Link to="/genres" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="md" variant="outline">Browse Genres</Button>
          </Link>
          <Link to="/reviews" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="md" variant="outline">View Reviews</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}

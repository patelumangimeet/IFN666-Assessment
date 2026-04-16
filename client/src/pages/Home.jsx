import { Button, Container, Title, Text, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container 
      size="md" 
      style={{ 
        marginTop: 100,
        backgroundColor: 'rgba(48, 43, 99, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '40px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}
    >
      <Stack align="center" justify="center">
        <Title order={1} style={{ color: '#fff' }}>🎬 Welcome to CineTrack</Title>
        <Text size="lg" style={{ color: '#b0b0ff' }}>Your personal movie watchlist manager</Text>
        
        <Stack gap="xs" style={{ marginTop: 20, maxWidth: 400 }}>
          <Text size="sm" align="center" style={{ color: '#b0b0ff' }}>
            CineTrack helps you organize and track movies. Create genres, add movies to your watchlist, and share reviews with ratings.
          </Text>
          <Text size="xs" align="center" style={{ color: '#8080d0' }}>
            ✓ Organize by genre &nbsp; ✓ Rate movies &nbsp; ✓ Write reviews &nbsp; ✓ Track status
          </Text>
        </Stack>
        
        <Stack style={{ marginTop: 40, width: '100%' }}>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg" className="cinetrack-button" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>Browse Movies</Button>
          </Link>
          <Link to="/genres" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg" variant="light" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}>Browse Genres</Button>
          </Link>
          <Link to="/reviews" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg" variant="light" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)' }}>View Reviews</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}

import { Button, Container, Title, Text, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container size="md" style={{ marginTop: 100 }}>
      <Stack align="center" justify="center">
        <Title order={1}>🎬 Welcome to CineTrack</Title>
        <Text size="lg" color="dimmed">Your personal movie watchlist manager</Text>
        
        <Stack style={{ marginTop: 40 }}>
          <Link to="/movies" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg">Browse Movies</Button>
          </Link>
          <Link to="/genres" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg" variant="light">Browse Genres</Button>
          </Link>
          <Link to="/reviews" style={{ textDecoration: 'none' }}>
            <Button fullWidth size="lg" variant="light">View Reviews</Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}

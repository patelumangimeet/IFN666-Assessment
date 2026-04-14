import { Stack } from '@mantine/core';
import MovieCard from './MovieCard';

export default function MovieList({ movies, onDelete }) {
  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <Stack>
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} onDelete={onDelete} />
      ))}
    </Stack>
  );
}

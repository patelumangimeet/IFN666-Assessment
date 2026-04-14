import { Stack } from '@mantine/core';
import GenreCard from './GenreCard';

export default function GenreList({ genres, onDelete }) {
  if (genres.length === 0) {
    return <div>No genres found</div>;
  }

  return (
    <Stack>
      {genres.map(genre => (
        <GenreCard key={genre._id} genre={genre} onDelete={onDelete} />
      ))}
    </Stack>
  );
}

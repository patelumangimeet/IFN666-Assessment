import { Stack } from '@mantine/core';
import ReviewCard from './ReviewCard';

export default function ReviewList({ reviews, onDelete }) {
  if (reviews.length === 0) {
    return <div>No reviews found</div>;
  }

  return (
    <Stack>
      {reviews.map(review => (
        <ReviewCard key={review._id} review={review} onDelete={onDelete} />
      ))}
    </Stack>
  );
}

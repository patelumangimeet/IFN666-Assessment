import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Loader, Container, Box } from '@mantine/core';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Container size="md" style={{ marginTop: 100 }}>
        <Box style={{ display: 'flex', justifyContent: 'center' }}>
          <Loader />
        </Box>
      </Container>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

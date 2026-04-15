import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextInput, PasswordInput, Button, Stack, Title } from '@mantine/core';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password
      });
      login(res.data.data.user, res.data.data.token);
      navigate('/movies');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <Container size={420} style={{ marginTop: 100 }}>
      <Title order={2}>Register</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" fullWidth>Register</Button>
        </Stack>
      </form>
      <div style={{ marginTop: 20 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </Container>
  );
}

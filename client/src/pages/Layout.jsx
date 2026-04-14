import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppShell, Header, Group, Button, NavLink, Text, Burger, Container } from '@mantine/core';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [opened, setOpened] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      layout="default"
    >
      <AppShell.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
        <Link to="/" style={{ textDecoration: 'none', fontSize: 20, fontWeight: 'bold', color: 'inherit', marginLeft: 20 }}>
          🎬 CineTrack
        </Link>
        <Group gap="md" visibleFrom="sm">
          <Link to="/movies" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text size="sm" fw={500}>Movies</Text>
          </Link>
          <Link to="/genres" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text size="sm" fw={500}>Genres</Text>
          </Link>
          <Link to="/reviews" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Text size="sm" fw={500}>Reviews</Text>
          </Link>
          {isLoggedIn ? (
            <Button variant="light" size="xs" onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="light" size="xs">Login</Button>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Button size="xs">Register</Button>
              </Link>
            </>
          )}
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

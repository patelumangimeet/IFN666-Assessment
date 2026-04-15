import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Genres from './pages/Genres'
import Reviews from './pages/Reviews'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPage from './pages/NoPage'
import { ProtectedRoute } from './contexts/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
        <Route path="genres" element={<ProtectedRoute><Genres /></ProtectedRoute>} />
        <Route path="reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  )
}

export default App

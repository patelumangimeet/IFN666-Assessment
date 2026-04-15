# CineTrack - Movie Watchlist Web Client

## Overview
CineTrack Frontend is a modern React web application for managing a personal movie watchlist. Users can register, authenticate securely, create movie genres, add movies to their watchlist with watch status tracking, and write detailed reviews with ratings. Built with React 18, Vite for optimal performance, and Mantine UI for a professional, accessible user interface.

## Purpose & Use Case
The React client provides a user-friendly interface to:
- Register and authenticate with JWT-based tokens
- Create and manage movie genres (Action, Comedy, Drama, etc.)
- Build a personal movie watchlist with watch status tracking (watchlist/watched/abandoned)
- Search, filter, and sort movies by multiple criteria
- Write, edit, and delete reviews with ratings (1-10 scale)
- Browse movies and reviews with pagination support
- Experience a responsive, mobile-friendly design

## Core Features

### 1. Authentication & Authorization
- **User Registration**: Create account with username and password validation
- **Secure Login**: JWT token-based authentication with token persistence
- **Protected Routes**: Movies, Genres, and Reviews pages require authentication
- **Auto-Redirect**: Unauthenticated users automatically redirected to login
- **Logout**: Clear session and redirect to home page
- **Auth Context**: Centralized authentication state using React useContext hook

### 2. Complete User Interface
- **Home Page**: Landing page with navigation and feature overview
- **Login Page**: Authentication form with validation error messages
- **Register Page**: User registration with password requirements display
- **Movies Page**: Browse all movies with advanced search, sort, and filter
- **Genres Page**: Manage genres - create new, view, edit, delete
- **Reviews Page**: View reviews with filtering by movie
- **Responsive Layout**: Mobile-friendly with Mantine responsive utilities

### 3. Advanced Movie Management
- **Search**: Real-time search by movie title (case-insensitive)
- **Sorting**: Sort by newest date, title, release year, or rating
- **Filtering**: Filter by watch status (watchlist/watched/abandoned) or genre
- **Pagination**: Navigate through large lists (10 items per page by default)
- **Status Tracking**: Update movie status from watchlist to watched to abandoned
- **Rating System**: Rate movies on 1-10 scale
- **Edit/Delete**: Only movie creators can edit or delete their movies

### 4. Review System
- **Write Reviews**: Create detailed reviews with 1-10 rating scale
- **Review Validation**: Content must be minimum 10 characters, rating 1-10
- **Filter Reviews**: View reviews by specific movie
- **Edit/Delete**: Users can edit or delete their own reviews
- **Display**: Show reviewer name, rating, content, and creation date

### 5. Genre Management
- **Create Genres**: Add custom movie genres
- **View All**: Browse all genres with pagination
- **Edit**: Modify genre name and description
- **Delete**: Remove genres (by creator)
- **Pagination**: Navigate through genre lists

### 6. User Experience Enhancements
- **Loading States**: Show loaders during async operations
- **Error Messages**: Clear, actionable error messages for validation
- **Form Validation**: Real-time validation with helpful prompts
- **Responsive Design**: Works seamlessly on mobile, tablet, desktop
- **Navigation**: Intuitive header with context-aware menu
- **Input Validation**: Username, password, ratings, review content all validated

## Architecture

### React Component Structure
```
App.jsx (Main routing container)
└── Layout.jsx (Header with navigation)
    ├── Home.jsx (Landing page)
    ├── Login.jsx (Authentication page)
    ├── Register.jsx (Registration page)
    ├── ProtectedRoute (Wrapper for auth-required pages)
    ├── Movies.jsx (Movie browser with search/sort)
    │   ├── MovieList.jsx (Paginated movie list)
    │   ├── MovieCard.jsx (Individual movie display)
    │   └── MovieForm.jsx (Create/edit movie form)
    ├── Genres.jsx (Genre browser)
    │   ├── GenreList.jsx (Paginated genre list)
    │   ├── GenreCard.jsx (Individual genre display)
    │   └── GenreForm.jsx (Create/edit genre form)
    ├── Reviews.jsx (Review browser)
    │   ├── ReviewList.jsx (Paginated review list)
    │   ├── ReviewCard.jsx (Individual review display)
    │   └── ReviewForm.jsx (Create/edit review form)
    └── NoPage.jsx (404 error page)

Contexts/
└── AuthContext.jsx (JWT auth state management with useAuth hook)
└── ProtectedRoute.jsx (Route protection wrapper)
```

### State Management
- **AuthContext (useContext Hook)**:
  - Manages user, token, loading state
  - Provides login(), logout(), isAuthenticated() functions
  - Persists auth state in localStorage
  - Provides useAuth() custom hook for components
- **Component State (useState)**: 
  - Form inputs in MovieForm, GenreForm, ReviewForm
  - Component-level data management
  - Error message display
- **API Data**: Fetched from backend and stored in component state

### HTTP Communication
- **Axios Client**: HTTP library for API requests
- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Authorization Header**: JWT token automatically added to authenticated requests
- **Error Handling**: API errors caught and displayed to user
- **Response Parsing**: JSON response data extracted and processed

### Routing
- **React Router v6**: Client-side navigation
- **Route Protection**: Protected routes require valid JWT token
- **Lazy Loading**: Components loaded on demand
- **NavLink**: Active route highlighting in navigation

## Installation & Setup

### Prerequisites
- **Node.js** v14 or higher
- **npm** or yarn package manager
- **Git** for version control
- **Backend API** running and accessible (see server README)

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/patelumangimeet/IFN666-Assessment.git
cd IFN666-Assessment/client
```

#### 2. Install Dependencies
```bash
npm install
```

This installs:
- React & React Router for UI and navigation
- Mantine UI components and hooks
- Axios for HTTP requests
- Vite as build tool and dev server

#### 3. Environment Configuration
Create a `.env` file in the client directory:
```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# For production, update to:
# VITE_API_URL=https://your-domain.com/api
```

#### 4. Start Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

#### 5. Build for Production
```bash
npm run build
```

Creates optimized production build in `dist/` folder

#### 6. Preview Production Build
```bash
npm run preview
```

Preview the production build locally before deploying

## Dependencies

### Core Framework
- **react** (v18.2): UI library for building interactive interfaces
- **react-dom** (v18.2): Rendering React components in the DOM

### Routing & Navigation
- **react-router-dom** (v6): Client-side routing and navigation

### UI Component Library
- **@mantine/core** (v7): Professional React component library with 100+ components
- **@mantine/hooks** (v7): Custom React hooks from Mantine
- **@tabler/icons-react**: Icon set (1000+ icons)

### HTTP Client
- **axios** (v1.0+): Promise-based HTTP client with interceptor support

### Build Tools
- **vite** (v4+): Modern build tool with Hot Module Replacement (HMR)

## Project Structure
```
client/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Genre/
│   │   │   ├── GenreForm.jsx     # Form for creating/editing genres
│   │   │   ├── GenreCard.jsx     # Single genre display card
│   │   │   └── GenreList.jsx     # List of genres with pagination
│   │   ├── Movie/
│   │   │   ├── MovieForm.jsx     # Form for creating/editing movies
│   │   │   ├── MovieCard.jsx     # Single movie display card
│   │   │   └── MovieList.jsx     # List of movies with search/sort/filter
│   │   └── Review/
│   │       ├── ReviewForm.jsx    # Form for creating/editing reviews
│   │       ├── ReviewCard.jsx    # Single review display card
│   │       └── ReviewList.jsx    # List of reviews with pagination
│   ├── contexts/            # React Context for state management
│   │   ├── AuthContext.jsx   # JWT auth state, login/logout, useAuth hook
│   │   └── ProtectedRoute.jsx # Wrapper for auth-required routes
│   ├── pages/               # Full page components (8 total)
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── .env                     # Environment variables
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and npm scripts
└── index.html              # HTML entry point
```

## API Integration

### Endpoints Used
```
POST /api/auth/register    → Create new user account
POST /api/auth/login       → Authenticate and receive JWT

GET /api/genres?page=&limit=      → Fetch paginated genres
POST /api/genres           → Create new genre (authenticated)
PUT /api/genres/:id        → Update genre (authenticated)
DELETE /api/genres/:id     → Delete genre (authenticated)
GET /api/genres/:id        → Fetch single genre

GET /api/movies?search=&genre=&status=&sortBy=&order=&page=&limit= → Fetch movies
POST /api/movies           → Create new movie (authenticated)
PUT /api/movies/:id        → Update movie (authenticated)
DELETE /api/movies/:id     → Delete movie (authenticated)
GET /api/movies/:id        → Fetch single movie

GET /api/reviews?movie=&page=&limit= → Fetch paginated reviews
POST /api/reviews          → Create review (authenticated)
PUT /api/reviews/:id       → Update review (authenticated)
DELETE /api/reviews/:id    → Delete review (authenticated)
GET /api/reviews/:id       → Fetch single review
```

## Development Guide

### Authentication Flow
1. User navigates to `/register` and submits registration form
2. Frontend validates: username length, password complexity
3. Axios POST to `/api/auth/register` sends { username, password }
4. Backend validates and creates user, returns user object
5. Frontend calls `login(userData, token)` from AuthContext
6. Token stored in localStorage, user state updated
7. User redirected to `/` (home page)
8. On `/login` page, user submits credentials
9. Axios includes token in request Authorization header for all subsequent requests
10. ProtectedRoute checks `isAuthenticated()` - if false, redirects to login
11. Logout clears token from localStorage and context state
12. User automatically redirected and cannot access protected routes

### Form Handling Pattern
Forms use controlled components with useState:
```jsx
const [formData, setFormData] = useState({ title: '', year: '', ... });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({});
  try {
    // Validate locally
    // API call via axios
    // Handle response or error
  } catch (error) {
    setErrors({ form: error.message });
  }
};
```

### Pagination Implementation
- Backend returns: data[], total, page, pages
- Frontend receives HTTP Link header: `Link: <url>; rel="next", <url>; rel="prev"`
- Frontend state tracks currentPage
- Clicking next/prev calls API with updated page parameter
- List re-renders with new data

## Validation Rules Reference

### User Registration
- **username**: 3-20 characters, alphanumeric + underscore only
- **password**: Minimum 8 characters, must include uppercase, lowercase, and number

### Movie Creation/Update
- **title**: Required, max 200 characters
- **releaseYear**: Required, valid year (1800 to current year)
- **genre**: Required, must select from existing genres
- **status**: Required, one of: watchlist, watched, abandoned
- **rating**: Optional, number between 0-10

### Genre Creation/Update
- **name**: Required, max 100 characters
- **description**: Optional, max 500 characters

### Review Creation/Update
- **content**: Required, minimum 10 characters, maximum 5000 characters
- **score**: Required, integer 1-10

## User Workflows

### Complete Movie Watchlist Flow
1. **Register** → Enter username/password
2. **Login** → Authenticate with credentials
3. **Create Genre** → Add movie genre (e.g., "Action")
4. **Add Movie** → Create movie with genre selection
5. **Browse** → View movies with pagination
6. **Search** → Find movie by title
7. **Sort** → Order by date, title, year, or rating
8. **Filter** → Filter by genre or watch status
9. **Update Status** → Change movie from watchlist to watched
10. **Rate Movie** → Set movie rating (0-10)
11. **Write Review** → Create review with score and content
12. **Logout** → Clear session

## Deployment

### Build for Production
```bash
npm run build
```

Creates optimized `dist/` folder ready for deployment.

### Deploy to Web Server
1. Copy `dist/` folder contents to web server
2. Update `.env` with production API URL
3. Configure web server to serve `index.html` for all routes (React Router)
4. Enable gzip compression for optimal performance

### Performance Optimization
- Vite automatically optimizes build
- Code splitting enabled by default
- CSS modules for scoped styling
- Minification of all assets

## Testing

### Manual Testing Checklist
- [ ] Register new user account
- [ ] Login with credentials
- [ ] Create genre
- [ ] Create movie (select genre)
- [ ] Search movie by title
- [ ] Sort movies (by date, title, year, rating)
- [ ] Filter movies (by genre, status)
- [ ] Update movie status (watchlist → watched)
- [ ] Rate movie (1-10)
- [ ] Write review (min 10 chars, score 1-10)
- [ ] Edit review
- [ ] Delete review
- [ ] Navigate pagination
- [ ] Logout and verify redirected to login
- [ ] Test responsiveness on mobile

### Testing Invalid Inputs
- Register with short username (< 3 chars)
- Register with weak password
- Create movie without genre
- Create review with score > 10
- Create review with content < 10 chars
- Verify error messages display correctly

## Troubleshooting

### "Cannot find module" Errors
- Run `npm install` to ensure all dependencies installed
- Check import paths are correct
- Verify file extensions (.jsx, .js) in imports

### API Connection Failed
- Verify backend is running: `npm run dev` in server directory
- Check VITE_API_URL in .env matches backend address
- Verify CORS is enabled in backend
- Check Browser DevTools Network tab for request errors

### 401 Unauthorized Errors
- Token may be expired - logout and login again
- Verify token sent with request in Authorization header
- Check backend JWT_SECRET matches

### Pagination Not Working
- Verify backend returns data array and total count
- Check page/limit parameters sent in query string
- Verify Link header present in HTTP response headers

### Styles Not Loading
- Clear browser cache
- Run `npm run build` and `npm run preview`
- Check @mantine/core installed
- Verify Mantine theme applied in main.jsx

## Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Mantine Component Library](https://mantine.dev/)
- [Axios Documentation](https://axios-http.com/)
- [Vite Documentation](https://vitejs.dev/)

## License
MIT License - See LICENSE file for details

## Support & Contact
For issues, questions, or contributions, please open an issue on GitHub or contact the development team.

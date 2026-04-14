# CineTrack - Movie Watchlist Web Client

## Purpose
Web-based frontend for the CineTrack Movie Watchlist application. A fully functional React application that allows users to manage their personal movie watchlist, organize movies by genre, mark them as watched, and write reviews. Built with React 18 and Vite for optimal development experience and production performance.

## Architecture

### Pages
- **Home**: Landing page with navigation to main features
- **Login**: Authentication page for existing users
- **Register**: User registration with password validation
- **Movies**: Browse, search, sort, and manage movies with pagination
- **Genres**: View, create, and manage genres
- **Reviews**: View and filter reviews by movie
- **Layout**: Main application layout with navigation header
- **NoPage**: 404 error page

### Components
- **Genre**: GenreForm, GenreCard, GenreList - For genre management
- **Movie**: MovieForm, MovieCard, MovieList - For movie management
- **Review**: ReviewForm, ReviewCard, ReviewList - For review operations

### API Integration
- Axios-based HTTP client connecting to backend API
- Base URL configured via `VITE_API_URL` environment variable
- JWT token stored in localStorage for authenticated requests

### Routing
- React Router v6 for client-side navigation
- Protected routes through JWT token presence in localStorage

### UI Framework
- Mantine v7 for responsive, accessible components
- Tabler Icons for consistent iconography
- Mobile-responsive design using Mantine Grid and responsive styles

## Features

### Authentication
- User registration with password validation
- JWT-based login system
- Token persistence in localStorage
- Automatic logout functionality

### Movie Management
- Browse all movies with pagination (10 items per page)
- **Search**: Real-time search by movie title (case-insensitive)
- **Sort**: By newest, title, release year, or rating
- **Filter**: By watch status (watchlist/watched) or genre
- **Edit**: Update movie status and rating (by creator)
- **Delete**: Remove movies (by creator)

### Genre Management
- View all genres with pagination
- Create new genres (authenticated users)
- Edit genre name and description (by creator)
- Delete genres (by creator)

### Review Management
- View all reviews with pagination
- Filter reviews by movie
- Create reviews with rating 1-10 and min 10-char content
- Edit/delete reviews (by creator)

### Input Validation
- Username: Required, 3-20 chars, alphanumeric + underscore
- Password: Min 8 chars, uppercase, lowercase, number
- Movie title: Required
- Release year: Required, valid year (1800-present)
- Review content: Min 10 characters
- Review score: 1-10 range
- Genre name: Required

### Responsive Design
- Mobile-friendly layout with Mantine responsive utilities
- Desktop and tablet optimized
- Collapsible navigation for smaller screens
- Adaptive component sizing

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Backend API running on configured VITE_API_URL

### Install Dependencies
```bash
cd client
npm install
```

### Environment Configuration
Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:5000/api
```

For production, update to your deployed API URL.

### Development Server
```bash
npm run dev     # Starts on http://localhost:5173
```

### Production Build
```bash
npm run build   # Creates optimized build in dist/
npm run preview # Preview production build locally
```

## Dependencies
- **react**: UI library for building components
- **react-dom**: React rendering engine
- **react-router-dom**: Client-side routing
- **@mantine/core**: Component library for UI elements
- **@mantine/hooks**: Custom React hooks from Mantine
- **@tabler/icons-react**: Icon set
- **axios**: HTTP client for API requests
- **vite**: Fast build tool and dev server

## User Flow
1. **Register**: User creates account with username and password
2. **Login**: User logs in to receive JWT token
3. **Create Genre**: User creates a movie genre (e.g., "Action", "Comedy")
4. **Add Movie**: User adds movie to watchlist with genre selection
5. **Mark Watched**: User updates movie status to "watched"
6. **Write Review**: User writes rating and review for a movie
7. **Search/Sort**: User finds movies using search and sorting options
8. **Browse Pages**: User navigates through paginated lists
9. **Logout**: User logs out, clearing session

## File Structure
```
src/
├── components/
│   ├── Genre/
│   │   ├── GenreForm.jsx
│   │   ├── GenreCard.jsx
│   │   └── GenreList.jsx
│   ├── Movie/
│   │   ├── MovieForm.jsx
│   │   ├── MovieCard.jsx
│   │   └── MovieList.jsx
│   └── Review/
│       ├── ReviewForm.jsx
│       ├── ReviewCard.jsx
│       └── ReviewList.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Movies.jsx
│   ├── Genres.jsx
│   ├── Reviews.jsx
│   ├── Layout.jsx
│   └── NoPage.jsx
├── App.jsx
└── main.jsx
```

## State Management
Currently uses React local state (useState, useEffect) for:
- Authentication token in localStorage
- User ID in localStorage
- Component-level state for forms and data

## Error Handling
- Network errors displayed to user in forms
- 401 errors trigger re-authentication
- 403 errors show unauthorized message
- 404 errors shown for missing resources
- Input validation with user-friendly messages

## Contributing
When adding features:
1. Follow component-based structure
2. Use Mantine components for consistency
3. Keep forms in separate component files
4. Use axios for API calls
5. Store persistent data in localStorage
6. Handle errors gracefully

## Issue Reporting
Report issues with:
- Clear description of the problem
- Steps to reproduce
- Browser and OS information
- Error messages or console warnings
- Screenshots if applicable

## License
MIT

## Issues
Report issues in the project management system.

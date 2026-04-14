# CineTrack - Complete Project Specification

## Database Schema (MongoDB/Mongoose)

### User Model
```
username: String (unique, required)
password: String (hashed with bcrypt, required)
createdAt: Date (default: now)
updatedAt: Date (default: now)
```

### Genre Model
```
name: String (unique, required)
description: String
author: ObjectId (reference to User)
createdAt: Date (default: now)
updatedAt: Date (default: now)
```

### Movie Model
```
title: String (required)
description: String
releaseYear: Number
status: String (enum: "watchlist", "watched", "abandoned")
rating: Number (0-10, optional)
genre: ObjectId (reference to Genre, required)
author: ObjectId (reference to User, required)
createdAt: Date (default: now)
updatedAt: Date (default: now)
```

### Review Model
```
content: String (required, min 10 chars)
score: Number (1-10, required)
movie: ObjectId (reference to Movie, required)
author: ObjectId (reference to User, required)
createdAt: Date (default: now)
updatedAt: Date (default: now)
```

## Relationships
1. **User → Movies** (One-to-Many): One user can have many movies
2. **Genre → Movies** (One-to-Many): One genre can have many movies
3. **Movie → Reviews** (One-to-Many): One movie can have many reviews
4. **User → Reviews** (One-to-Many): One user can have many reviews

## API Endpoints (25+ endpoints)

### Authentication Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
```

### Genre Endpoints
```
GET    /api/genres                    # List all genres (paginated)
GET    /api/genres/:id                # Get genre by ID
POST   /api/genres                    # Create new genre (authenticated)
PUT    /api/genres/:id                # Update genre (authenticated)
DELETE /api/genres/:id                # Delete genre (authenticated)
```

### Movie Endpoints
```
GET    /api/movies                    # List all movies (paginated, search, sort)
GET    /api/movies/:id                # Get movie by ID
POST   /api/movies                    # Create new movie (authenticated)
PUT    /api/movies/:id                # Update movie (authenticated)
DELETE /api/movies/:id                # Delete movie (authenticated)

Query Parameters for GET /api/movies:
- search=<string>                     # Search by title
- genre=<genreId>                     # Filter by genre
- status=<watchlist|watched>          # Filter by status
- sortBy=<title|releaseYear|rating>   # Sort field
- order=<asc|desc>                    # Sort order
- page=<number>                       # Page number (1-indexed)
- limit=<number>                      # Items per page (default 10)
```

### Review Endpoints
```
GET    /api/reviews                   # List all reviews (paginated)
GET    /api/reviews/:id               # Get review by ID
POST   /api/reviews                   # Create new review (authenticated)
PUT    /api/reviews/:id               # Update review (authenticated)
DELETE /api/reviews/:id               # Delete review (authenticated)

Query Parameters for GET /api/reviews:
- movie=<movieId>                     # Filter by movie
- page=<number>                       # Page number
- limit=<number>                      # Items per page
```

## Middleware Components

### 1. authenticateWithJwt
- Purpose: Verify JWT token in Authorization header
- Usage: Protect authenticated endpoints
- Returns: 401 if no token or invalid token

### 2. validateMongoId
- Purpose: Validate ObjectId format before querying
- Usage: Validate ID parameters in routes
- Returns: 400 if invalid ID format

### 3. validatePaginationParams
- Purpose: Validate pagination query parameters
- Usage: Ensure valid page/limit values
- Returns: 400 if invalid pagination params

### 4. validateInput
- Purpose: Validate request body against schema rules
- Usage: Ensure required fields and correct types
- Returns: 400 with error details if validation fails

### 5. globalErrorHandler
- Purpose: Centralized error handling
- Usage: Catch and format all errors consistently
- Returns: Proper HTTP status codes and error messages

## Input Validation Rules

### User Registration
- username: required, min 3 chars, max 20 chars, alphanumeric only
- password: required, min 8 chars, must include uppercase, lowercase, number

### Movie Creation
- title: required, min 1 char, max 100 chars
- description: optional, max 1000 chars
- releaseYear: required, valid year (1800-current year)
- genre: required, valid MongoDB ObjectId

### Review Creation
- content: required, min 10 chars, max 1000 chars
- score: required, integer between 1 and 10

### Pagination
- page: optional, min 1, default 1
- limit: optional, min 1, max 100, default 10

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "data": null
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "pages": 5
  },
  "links": {
    "next": "/api/movies?page=2&limit=10",
    "prev": null,
    "self": "/api/movies?page=1&limit=10"
  }
}
```

## React Component Hierarchy

```
App
├── Layout
│   ├── Navigation (Mantine Header)
│   ├── Outlet (page content)
│   └── Footer
├── Pages
│   ├── Home
│   ├── Movies
│   │   ├── MovieSearchBar
│   │   ├── MovieList
│   │   │   └── MovieCard (multiple)
│   │   └── MovieForm
│   ├── Genres
│   │   ├── GenreList
│   │   │   └── GenreCard or Row (multiple)
│   │   └── GenreForm
│   ├── Reviews
│   │   ├── ReviewList
│   │   │   └── ReviewCard (multiple)
│   │   └── ReviewForm
│   ├── Login
│   ├── Register
│   └── NoPage (404)
```

## Client Pages Description

### Home Page
- Welcome message
- Quick stats: total movies, genres, reviews
- Quick links to create/browse movies
- Featured movies section

### Movies Page
- Movie search bar with title search
- Sort dropdown (title, release year, rating, status)
- Filter by genre dropdown
- Pagination controls
- Movie list/grid with MovieCard components
- Add new movie button
- Each movie card shows: title, year, rating, status, actions

### Genres Page
- List of genres
- Option to create new genre
- Each genre shows: name, description, movie count, actions (edit/delete)

### Reviews Page
- List of reviews
- Search/filter by movie
- Pagination
- Review cards showing: movie title, score, content preview, author, date

### Login Page
- Username field
- Password field
- Login button
- Link to register page

### Register Page
- Username field
- Password field
- Confirm password field
- Register button
- Link to login page

## Application Flow

1. User visits Home page
2. User registers (creates account)
3. User logs in (receives JWT token)
4. User creates a genre (e.g., "Action", "Comedy")
5. User adds a movie and assigns it to a genre
6. User marks movie as "watched" or "watchlist"
7. User writes a review for the movie
8. User searches/sorts movies on Movies page
9. User browses reviews on Reviews page
10. User can manage genres on Genres page

## Server File Structure Checklist
- [x] server.js (entry point)
- [x] .env.example (environment template)
- [x] package.json (dependencies)
- [x] README.md (documentation)
- [ ] src/models/user.js
- [ ] src/models/genre.js
- [ ] src/models/movie.js
- [ ] src/models/review.js
- [ ] src/controllers/auth.js
- [ ] src/controllers/genre.js
- [ ] src/controllers/movie.js
- [ ] src/controllers/review.js
- [ ] src/middleware/authenticateWithJwt.js
- [ ] src/middleware/validateMongoId.js
- [ ] src/middleware/validatePaginationParams.js
- [ ] src/middleware/validateInput.js
- [ ] src/routes/index.js
- [ ] src/routes/auth.js
- [ ] src/routes/genre.js
- [ ] src/routes/movie.js
- [ ] src/routes/review.js
- [ ] API-collection.json (Hoppscotch/Postman)

## Client File Structure Checklist
- [x] index.html
- [x] vite.config.js
- [x] package.json
- [x] README.md
- [x] .env
- [x] public/favicon.svg
- [ ] src/main.jsx
- [ ] src/App.jsx
- [ ] src/pages/Home.jsx
- [ ] src/pages/Movies.jsx
- [ ] src/pages/Genres.jsx
- [ ] src/pages/Reviews.jsx
- [ ] src/pages/Login.jsx
- [ ] src/pages/Register.jsx
- [ ] src/pages/Layout.jsx
- [ ] src/pages/NoPage.jsx
- [ ] src/components/Movie/MovieList.jsx
- [ ] src/components/Movie/MovieCard.jsx
- [ ] src/components/Movie/MovieForm.jsx
- [ ] src/components/Movie/MovieSearchBar.jsx
- [ ] src/components/Genre/GenreList.jsx
- [ ] src/components/Genre/GenreForm.jsx
- [ ] src/components/Review/ReviewList.jsx
- [ ] src/components/Review/ReviewCard.jsx
- [ ] src/components/Review/ReviewForm.jsx

## Additional Features Implemented

### Server
1. ✅ **Authentication (3 marks)** - JWT-based user auth
2. ✅ **Input Validation (3 marks)** - Schema validation on all endpoints
3. ✅ **Search and Sort (3 marks)** - MongoDB query support
4. ✅ **Pagination (3 marks)** - Header-based navigation links

### Client
1. ✅ **Authentication (3 marks)** - Login/register with JWT
2. ✅ **Input Validation (3 marks)** - Client-side validation + errors
3. ✅ **Search and Sort (3 marks)** - Client-side + server-side
4. ✅ **Responsive Design (3 marks)** - Mobile-friendly with Mantine

## Important Notes
- Server runs on port 5000 by default
- Client runs on port 3000 by default
- JWT token stored in localStorage on client
- All passwords hashed with bcrypt
- File will be deleted and recreated from repo before final submission
- No node_modules included in final zip
- Caddyfile will be provided for production deployment

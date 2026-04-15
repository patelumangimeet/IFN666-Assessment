# CineTrack - Movie Watchlist API Server

## Overview
CineTrack Backend is a robust RESTful API for managing a personal movie watchlist application. Users can register, authenticate with JWT tokens, create movie genres, add movies to their watchlist, track watch status, and write reviews with ratings. The API implements complete CRUD operations for Movies, Genres, and Reviews entities with comprehensive input validation, pagination, search/sort functionality, and role-based access control.

## Purpose & Use Case
The API serves as a personal media management tool allowing users to:
- Maintain a personal movie database with watch status tracking (watchlist/watched/abandoned)
- Organize movies by genre for better curation
- Write detailed reviews with ratings (1-10 scale)
- Search and filter movies by title, genre, or status
- Sort movies by multiple criteria (release year, rating, date added)

## Core Features

### 1. Authentication & Authorization
- **JWT-based Authentication**: Secure token-based system protecting write operations
- **Password Security**: Bcrypt hashing with validation (min 8 chars: uppercase + lowercase + number)
- **Access Control**: All POST/PUT/DELETE operations require valid JWT token
- **User Isolation**: Each user's data is isolated and independent
- **Token Validation**: All authenticated routes verify token validity via middleware

### 2. Complete CRUD Operations
- **Users** (2 endpoints): Register, Login
- **Genres** (5 endpoints): Create, Read, Update, Delete, List with pagination
- **Movies** (5 endpoints): Create, Read, Update, Delete, List with advanced search/sort/filter
- **Reviews** (5 endpoints): Create, Read, Update, Delete, List with pagination
- **Total: 17 CRUD Endpoints** across 4 entities

### 3. Advanced Querying & Pagination
- **Pagination**: All list endpoints (GET /genres, /movies, /reviews) support pagination
  - Parameters: `page`, `limit` (default: 10, max: 100)
  - **RFC 8288 Compliant HTTP Link Headers**: Navigation links sent in response headers, not JSON body
  - Link format: `Link: <url>; rel="self", <url>; rel="next", <url>; rel="prev"`
- **Search**: Movie search by title (case-insensitive)
- **Sorting**: Multiple sort options - title, releaseYear, rating, createdAt
- **Filtering**: By genre, watch status, or any movie field

### 4. Data Validation
- **Genre**: name required (unique per user), optional description
- **Movie**: title required, releaseYear 1800-present, status (watchlist|watched|abandoned), rating 0-10
- **Review**: content min 10 chars, score 1-10 numeric rating
- **User**: username 3-20 alphanumeric + underscore (unique), password requirements enforced

### 5. Database Relationships
- One User → many Genres (user owns genres)
- One User → many Movies (user owns movies)
- One Genre → many Movies (genre categorizes movies)
- One Movie → many Reviews (movie has reviews)
- One User → many Reviews (user writes reviews)

## API Endpoints

### Authentication Endpoints
```
POST /api/auth/register
  - Body: { username, password }
  - Returns: user { id, username, createdAt }
  - No auth required

POST /api/auth/login
  - Body: { username, password }
  - Returns: { token, user: { id, username } }
  - No auth required
```

### Genre Endpoints (All require valid JWT for POST/PUT/DELETE)
```
GET /api/genres?page=1&limit=10
  - Returns: { data: [genres], total, page, pages, links }
  - Pagination via HTTP Link header
  - No auth required for GET

POST /api/genres
  - Body: { name, description }
  - Returns: created genre object
  - Requires JWT

PUT /api/genres/:id
  - Body: { name, description }
  - Returns: updated genre
  - Requires JWT

DELETE /api/genres/:id
  - Returns: success message
  - Requires JWT

GET /api/genres/:id
  - Returns: specific genre by ObjectId
  - No auth required
```

### Movie Endpoints (All require valid JWT for POST/PUT/DELETE)
```
GET /api/movies?page=1&limit=10&search=&genre=&status=&sortBy=&order=
  - Query params:
    - search: case-insensitive title search
    - genre: filter by genre ObjectId
    - status: filter by status (watchlist/watched/abandoned)
    - sortBy: title, releaseYear, rating, createdAt
    - order: asc or desc
    - page: page number (default 1)
    - limit: items per page (default 10)
  - Returns: { data: [movies], total, page, pages }
  - Pagination via HTTP Link header
  - No auth required for GET

POST /api/movies
  - Body: { title, description, releaseYear, genre, status, rating }
  - Returns: created movie object with full details
  - Requires JWT

PUT /api/movies/:id
  - Body: { title, description, releaseYear, genre, status, rating }
  - Returns: updated movie object
  - Requires JWT

DELETE /api/movies/:id
  - Returns: success message
  - Requires JWT

GET /api/movies/:id
  - Returns: specific movie with populated genre and review count
  - No auth required
```

### Review Endpoints (All require valid JWT for POST/PUT/DELETE)
```
GET /api/reviews?page=1&limit=10&movie=&page=1&limit=10
  - Query params:
    - movie: filter reviews by movie ObjectId
    - page: page number (default 1)
    - limit: items per page (default 10)
  - Returns: { data: [reviews], total, page, pages }
  - Pagination via HTTP Link header
  - No auth required for GET

POST /api/reviews
  - Body: { content, score, movie }
  - Returns: created review with user and movie details
  - Requires JWT

PUT /api/reviews/:id
  - Body: { content, score }
  - Returns: updated review
  - Requires JWT

DELETE /api/reviews/:id
  - Returns: success message
  - Requires JWT

GET /api/reviews/:id
  - Returns: specific review with populated user and movie
  - No auth required
```

## Technical Architecture

### Layered Architecture Pattern
```
Routes (src/routes/) ↓
  ↓
Controllers (src/controllers/) ↓ 
  ↓
Models (src/models/) ↓
  ↓
MongoDB Database
```

#### Layers
- **Routes Layer** (`src/routes/`): 
  - Defines API endpoints
  - Attaches middleware for validation and authentication
  - Routes requests to appropriate controllers
  - 5 route files: auth.js, genre.js, movie.js, review.js, index.js (main router)

- **Controllers Layer** (`src/controllers/`):
  - Business logic for each resource (auth.js, genre.js, movie.js, review.js)
  - Handles pagination, search, sort, filter logic
  - Validates input data
  - Manages database queries via Mongoose models
  - Returns standardized JSON responses with proper HTTP status codes

- **Models Layer** (`src/models/`):
  - Mongoose schemas with validation rules
  - Defines User, Genre, Movie, Review schemas
  - Schema relationships via ObjectId foreign keys
  - Timestamps (createdAt, updatedAt) tracked automatically

- **Middleware Layer** (`src/middleware/`):
  - `authenticateWithJwt.js`: Validates JWT tokens, protects authenticated routes
  - `validateMongoId.js`: Validates MongoDB ObjectId format in URL parameters
  - `validatePaginationParams.js`: Validates and sanitizes pagination query parameters

### Database Schema Design
- **Users**: id, username (unique), passwordHash, createdAt, updatedAt
- **Genres**: id, name (unique per user), description, userId (foreign key), createdAt, updatedAt
- **Movies**: id, title, description, releaseYear, status, rating, genreId (foreign key), userId (foreign key), createdAt, updatedAt
- **Reviews**: id, content, score, movieId (foreign key), userId (foreign key), createdAt, updatedAt

### Error Handling
- Standardized error responses: `{ error: "message", details: {...} }`
- HTTP status codes: 400 (validation), 401 (auth), 403 (forbidden), 404 (not found), 500 (server error)
- Detailed validation error messages for input debugging
- Graceful error propagation through layers


## Installation & Setup

### Prerequisites
- **Node.js** v14 or higher
- **npm** or yarn package manager
- **MongoDB** (local or MongoDB Atlas cloud instance)
- **Git** for version control

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/patelumangimeet/IFN666-Assessment.git
cd IFN666-Assessment/server
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Environment Configuration
Create a `.env` file in the server directory with:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/cinetrack

# JWT Configuration (generate a strong random string for production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Production Security Note**: In production, use environment variables from your deployment platform (Heroku, AWS, etc.). Never commit `.env` to version control.

#### 4. Start the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

Server will be available at `http://localhost:5000`

#### 5. Verify Installation
Test the API with:
```bash
curl http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "Password123"}'
```

## Dependencies

### Core Framework
- **express** (v4.18+): Web server framework for building REST API
- **cors**: Cross-Origin Resource Sharing middleware, enables requests from client app

### Database
- **mongoose** (v7.0+): MongoDB ODM with schema validation and relationships
- **mongodb** (v5.0+): Official MongoDB driver

### Authentication & Security
- **bcryptjs**: Passwords hashed with salt (10 rounds) before storage - never store plaintext
- **jsonwebtoken**: JWT token generation and verification for stateless auth

### Utilities
- **dotenv**: Loads environment variables from .env file
- **nodemon** (dev): Auto-restarts server during development on file changes

### Development Tools
- **npm**: Package manager and task runner

## Development Guide

### Project Structure
```
server/
├── src/
│   ├── controllers/          # Business logic layer
│   │   ├── auth.js          # Register/login logic
│   │   ├── genre.js         # Genre CRUD + pagination
│   │   ├── movie.js         # Movie CRUD + search/sort/filter
│   │   └── review.js        # Review CRUD + filtering
│   │
│   ├── models/              # Mongoose schemas
│   │   ├── user.js          # User schema with password validation
│   │   ├── genre.js         # Genre schema with user reference
│   │   ├── movie.js         # Movie schema with genre/user refs
│   │   └── review.js        # Review schema with movie/user refs
│   │
│   ├── routes/              # API endpoint definitions
│   │   ├── index.js         # Main router, combines all routes
│   │   ├── auth.js          # /api/auth routes
│   │   ├── genre.js         # /api/genres routes
│   │   ├── movie.js         # /api/movies routes
│   │   └── review.js        # /api/reviews routes
│   │
│   └── middleware/          # Custom middleware functions
│       ├── authenticateWithJwt.js       # JWT verification
│       ├── validateMongoId.js           # ObjectId validation
│       └── validatePaginationParams.js  # Pagination param sanitizing
│
├── server.js                # Express app setup, middleware config, port listener
├── package.json             # Dependencies and npm scripts
├── .env                     # Environment variables (NOT in git)
└── API-collection.json      # Postman/Hoppscotch API collection for testing
```

### Key Implementation Details

#### JWT Authentication Flow
1. User calls `POST /api/auth/register` with username & password
2. Password validated (length, uppercase, lowercase, number requirements)
3. Password hashed via bcryptjs (12 salt rounds)
4. User stored in MongoDB with hashed password
5. User calls `POST /api/auth/login` with credentials
6. Password compared against stored hash using bcryptjs
7. JWT token generated for successful login
8. Client stores token, includes in Authorization header for protected routes
9. Middleware `authenticateWithJwt` verifies token on each request
10. If valid, request proceeds; if invalid/missing, returns 401 Unauthorized

#### Pagination Implementation
Each list endpoint (GET /genres, /movies, /reviews) implements:
1. Accepts optional `page` and `limit` query parameters
2. Validates pagination params via middleware
3. Calculates skip: (page - 1) * limit
4. Queries MongoDB with .skip().limit()
5. Counts total records matching filter criteria
6. Calculates max pages: Math.ceil(total / limit)
7. **Builds RFC 8288 compliant Link header** with rel="self|next|prev"
8. Returns data array, total count, current page, total pages
9. Navigation links sent in `Link` HTTP response header (NOT JSON body)

#### Input Validation Strategy
- Schema-level validation via Mongoose validators
- Controller-level validation before database operations
- Detailed error messages returned to client for debugging
- Example: Movie creation validates title, releaseYear (1800-present), status enum, rating range

### Common Development Tasks

#### Adding a New Endpoint
1. Define route in `src/routes/resource.js`
2. Add controller logic in `src/controllers/resource.js`
3. Use existing model from `src/models/resource.js`
4. Apply appropriate middleware (auth for write operations)
5. Test via curl or Hoppscotch before committing

#### Debugging
- Check `NODE_ENV=development` in .env for verbose logging
- Use MongoDB management tool to inspect data directly
- Log JWT payload to verify token contents
- Test pagination with small limit values to verify algorithm

#### Testing Endpoints
Use the provided `API-collection.json`:
1. Import into Hoppscotch (https://hoppscotch.io)
2. Update baseURL to http://localhost:5000
3. Run "Create User" request first
4. Copy token from response
5. Set Authorization header in collection
6. Run subsequent requests

## Validation Rules Reference

### User Registration
- **username**: Required, 3-20 chars, alphanumeric + underscore (unique)
- **password**: Required, min 8 chars, must contain uppercase, lowercase, and number

### Genre Creation/Update
- **name**: Required, max 100 chars (unique per user)
- **description**: Optional, max 500 chars

### Movie Creation/Update
- **title**: Required, max 200 chars
- **description**: Optional, max 2000 chars
- **releaseYear**: Required, integer between 1800 and current year
- **status**: Required, must be one of: "watchlist", "watched", "abandoned"
- **genre**: Required, valid MongoDB ObjectId of existing genre
- **rating**: Optional, number between 0 and 10 (integer or decimal)

### Review Creation/Update
- **content**: Required, min 10 chars, max 5000 chars
- **score**: Required, integer between 1 and 10
- **movie**: Required, valid MongoDB ObjectId of existing movie

## Deployment

### Deploying to Production Server

#### Prerequisites
- Ubuntu/Linux server with SSH access
- Node.js and npm installed
- MongoDB instance (local Docker or MongoDB Atlas)
- PM2 for process management

#### Deployment Steps
1. Push code to GitHub
2. SSH into server
3. Clone repository: `git clone <repo_url>`
4. Set production environment variables
5. Install dependencies: `npm install --production`
6. Start with PM2: `pm2 start server.js --name "cinetrack-api"`
7. Configure Nginx as reverse proxy (optional)
8. Monitor with: `pm2 logs` or `pm2 status`

### Environment Variables for Production
```env
MONGODB_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<generate_strong_random_string>
PORT=5000
NODE_ENV=production
```

## Testing

### Manual Testing with Hoppscotch
1. Open https://hoppscotch.io
2. Import `API-collection.json`
3. Test each endpoint category:
   - **Auth**: register user, login, verify token
   - **Genres**: create, read, update, delete with pagination
   - **Movies**: create with all fields, search by title, sort by fields, filter by genre/status
   - **Reviews**: create with validation (score 1-10, content min 10), filter by movie
4. Verify pagination links in response headers
5. Test error cases: missing fields, invalid IDs, wrong credentials

### Error Responses to Verify
- `400 Bad Request`: Invalid input (missing required fields, invalid type)
- `401 Unauthorized`: Missing/invalid JWT token
- `403 Forbidden`: User attempting to modify other user's data
- `404 Not Found`: Resource doesn't exist
- `500 Server Error`: Unhandled exception

## Contributing Guidelines

### Code Style
- Use consistent 2-space indentation
- Use async/await instead of callback chaining
- Add error handling for all database operations
- Return meaningful error messages

### Adding Features
1. Create feature branch: `git checkout -b feature/feature-name`
2. Implement feature following existing patterns
3. Test thoroughly: all CRUD operations, edge cases, error handling
4. Update this README if adding new endpoints
5. Commit with clear message: `git commit -m "Add feature: description"`
6. Push and create pull request for review

### Testing Before Commit
- Run server: `npm run dev`
- Test all modified endpoints with Hoppscotch
- Verify pagination pagination headers present
- Check error handling for edge cases
- Verify JWT auth protection on write operations

## Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `docker ps` (if using Docker) or `mongod` (if local)
- Verify MONGODB_URI in .env is correct
- Check MongoDB server is listening on correct port (27017 default)

### JWT Token Invalid/Expired
- Ensure JWT_SECRET in .env matches what's in production
- Token contains expiration time - regenerate with new login
- Verify Authorization header format: `Bearer <token>`

### Port Already in Use
- Change PORT in .env to available port (e.g., 5001)
- Or kill existing process: `lsof -i :5000` then `kill -9 <pid>`

### Pagination Links Missing from Response
- Verify `Link` header is present in HTTP response (not JSON body)
- Check middleware hasn't been removed or disabled
- Ensure query params (page, limit) are valid integers

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [RESTful API Design](https://restfulapi.net/)

## License
MIT License - See LICENSE file for details

## Support & Contact
For issues, questions, or contributions, please open an issue on GitHub or contact the development team.


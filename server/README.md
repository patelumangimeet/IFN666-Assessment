# CineTrack - Movie Watchlist API

## Purpose
CineTrack is a RESTful API for managing a personal movie watchlist. Users can register, create genres, add movies, mark them as watched or unwatched, and write reviews with ratings. This API demonstrates full CRUD operations, JWT authentication, and MongoDB integration using a modern Node.js/Express stack.

## Endpoints Summary (17 CRUD Endpoints)

### Authentication (2 endpoints)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Genres (5 endpoints)
- `GET /api/genres` - Get all genres (paginated)
- `GET /api/genres/:id` - Get a specific genre by ID
- `POST /api/genres` - Create a new genre (authenticated)
- `PUT /api/genres/:id` - Update a genre (authenticated)
- `DELETE /api/genres/:id` - Delete a genre (authenticated)

### Movies (5 endpoints)
- `GET /api/movies` - Get all movies (paginated, searchable, sortable, filterable)
- `GET /api/movies/:id` - Get a specific movie by ID
- `POST /api/movies` - Add a new movie (authenticated)
- `PUT /api/movies/:id` - Update a movie (authenticated)
- `DELETE /api/movies/:id` - Delete a movie (authenticated)

### Reviews (5 endpoints)
- `GET /api/reviews` - Get all reviews (paginated)
- `GET /api/reviews/:id` - Get a specific review by ID
- `POST /api/reviews` - Create a new review (authenticated)
- `PUT /api/reviews/:id` - Update a review (authenticated)
- `DELETE /api/reviews/:id` - Delete a review (authenticated)

## Key Features
- **Authentication**: JWT-based authentication protecting write operations
- **CRUD Operations**: Full Create, Read, Update, Delete for 3 main entities
- **Database Relationships**: 
  - One User → many Genres
  - One Genre → many Movies
  - One Movie → many Reviews
  - One User → many Reviews
- **Search & Sort**: Movies searchable by title, sortable by title/year/rating
- **Pagination**: All list endpoints support page-based pagination with navigation links
- **Input Validation**: Comprehensive validation on all create/update operations
- **Error Handling**: Consistent JSON error responses with meaningful messages

## Architecture
- **Layered Architecture**: Routes → Controllers → Models
  - **Models** (`src/models/`): Mongoose schemas with validation rules
  - **Controllers** (`src/controllers/`): Business logic for each resource
  - **Routes** (`src/routes/`): API endpoint definitions
  - **Middleware** (`src/middleware/`): Authentication, validation, pagination handling

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or remote)
- npm or yarn

### Install Dependencies
```bash
cd server
npm install
```

### Environment Configuration
Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/cinetrack
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

### Run Development Server
```bash
npm run dev     # Runs with auto-reload on file changes
```

### Run Production Server
```bash
npm start       # Standard Node.js execution
```

Server will start on http://localhost:5000

## Dependencies
- **express**: Web application framework
- **mongoose**: MongoDB ODM with validation
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Middleware Components
- **authenticateWithJwt**: Verifies JWT tokens and protects authenticated routes
- **validateMongoId**: Validates MongoDB ObjectId format in URL parameters
- **validatePaginationParams**: Ensures valid pagination parameters (page, limit)

## Validation Rules
- **Genres**: name required (unique), description optional
- **Movies**: title required, releaseYear between 1800-present, status must be 'watchlist'/'watched'/'abandoned', rating 0-10
- **Reviews**: content min 10 chars, score between 1-10
- **Users**: username required (unique, alphanumeric+underscore), password min 8 chars (uppercase+lowercase+number)

## Query Parameters

### GET /api/movies
- `search=<string>` - Search by title (case-insensitive)
- `genre=<genreId>` - Filter by genre ObjectId
- `status=<value>` - Filter by status (watchlist/watched/abandoned)
- `sortBy=<field>` - Sort field (title/releaseYear/rating/createdAt)
- `order=<asc|desc>` - Sort order
- `page=<number>` - Page number (default: 1)
- `limit=<number>` - Items per page (default: 10, max: 100)

### GET /api/genres, GET /api/reviews
- `page=<number>` - Page number (default: 1)
- `limit=<number>` - Items per page (default: 10, max: 100)

## Contributing
When contributing, follow the established patterns:
1. Add model schema in `src/models/`
2. Add controller logic in `src/controllers/`
3. Define routes in `src/routes/`
4. Apply appropriate middleware to protect operations

## Issue Reporting
Report bugs and issues with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node version, MongoDB version, etc.)

## License
MIT
- MongoDB/Mongoose: Database and ODM
- bcrypt: Password hashing
- jsonwebtoken: JWT token management
- cors: Cross-Origin Resource Sharing
- dotenv: Environment configuration

## Installation
```bash
npm install
```

## Usage
```bash
npm run dev    # Development with auto-reload
npm start      # Production mode
```

## Contributing
Create feature branches for new features. Ensure all endpoints are tested with Hoppscotch before pushing.

## Issues
Report issues in the project management system or contact the development team.

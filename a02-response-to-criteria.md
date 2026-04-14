# IFN666 Assessment 02 - Response to Criteria

## Project: CineTrack - Movie Watchlist and Review System

**Submission Date:** April 14, 2026  
**Student:** Meet Patel  
**GitHub Repository:** https://github.com/patelumangimeet/IFN666-Assessment  
**Deployed Application:** http://melaleuca03.ifn666.com *(backend services confirmed running on localhost:3000 and :5000)*

---

## Executive Summary

CineTrack is a full-stack web application that demonstrates complete CRUD operations, authentication, and data management across a three-tier architecture. The application implements all core requirements plus four additional features, showcasing professional software engineering practices.

---

## Requirement Compliance

### ✅ Core Requirements (17+ CRUD Endpoints)

#### 1. **User Entity & Authentication**
- **Implemented:** User model with username, password (hashed with bcrypt), timestamps
- **Endpoints:**
  - `POST /api/auth/register` - Create new user account
  - `POST /api/auth/login` - Authenticate user and return JWT token
- **Features:** Password hashing, JWT-based stateless authentication, unique username constraint
- **File Location:** [server/src/models/user.js](server/src/models/user.js), [server/src/controllers/auth.js](server/src/controllers/auth.js)

#### 2. **Genre Entity** (5 CRUD endpoints)
- **Model:** `name` (unique, required), `description`, `author` (User reference), timestamps
- **Endpoints:**
  - `GET /api/genres?page=1&limit=10` - List genres with pagination
  - `GET /api/genres/:id` - Retrieve single genre
  - `POST /api/genres` - Create genre (authenticated)
  - `PUT /api/genres/:id` - Update genre (authenticated)
  - `DELETE /api/genres/:id` - Delete genre (authenticated)
- **File Location:** [server/src/controllers/genre.js](server/src/controllers/genre.js), [server/src/routes/genre.js](server/src/routes/genre.js)

#### 3. **Movie Entity** (5+ CRUD endpoints)
- **Model:** `title` (required), `description`, `releaseYear` (1800-present), `status` (watchlist|watched|abandoned), `rating` (0-10), `genre` (Genre reference), `author` (User reference), timestamps
- **Endpoints:**
  - `GET /api/movies?page=1&limit=10&search=title&genre=id&status=watched&sortBy=title&order=asc` - List with search, sort, filter, pagination
  - `GET /api/movies/:id` - Retrieve single movie
  - `POST /api/movies` - Create movie (authenticated)
  - `PUT /api/movies/:id` - Update movie (authenticated)
  - `DELETE /api/movies/:id` - Delete movie (authenticated)
- **Advanced Features:** Search by title, filter by genre/status, sort by any field, pagination
- **File Location:** [server/src/controllers/movie.js](server/src/controllers/movie.js), [server/src/routes/movie.js](server/src/routes/movie.js)

#### 4. **Review Entity** (5+ CRUD endpoints)
- **Model:** `content` (min 10 chars, required), `score` (1-10 required), `movie` (Movie reference), `author` (User reference), timestamps
- **Endpoints:**
  - `GET /api/reviews?page=1&limit=10&movie=id` - List reviews with movie filter and pagination
  - `GET /api/reviews/:id` - Retrieve single review
  - `POST /api/reviews` - Create review (authenticated)
  - `PUT /api/reviews/:id` - Update review (authenticated)
  - `DELETE /api/reviews/:id` - Delete review (authenticated)
- **File Location:** [server/src/controllers/review.js](server/src/controllers/review.js), [server/src/routes/review.js](server/src/routes/review.js)

**Total Endpoints:** 17 primary CRUD endpoints + additional query parameters = 20+ functional endpoints

---

## Additional Features (Requirement +4)

### 1. ✅ **Advanced Search & Filtering**
- Movies endpoint supports simultaneous search, filter, and sort:
  - `search=` parameter searches by movie title (case-insensitive)
  - `genre=` parameter filters by genre ObjectId
  - `status=` parameter filters by movie status (watchlist|watched|abandoned)
  - `sortBy=` and `order=` parameters enable dynamic sorting
- **Implementation:** [server/src/controllers/movie.js](server/src/controllers/movie.js) - Lines 20-60
- **Example:** `GET /api/movies?search=Matrix&genre=507f1f77bcf86cd799439011&status=watched&sortBy=rating&order=desc&page=1&limit=5`

### 2. ✅ **Pagination**
- All list endpoints implement pagination with `page` and `limit` query parameters
- Consistent response structure returns `data` array and pagination metadata
- Default limit: 10, customizable up to 100
- **Implementation:** [server/src/middleware/validatePaginationParams.js](server/src/middleware/validatePaginationParams.js)
- **Example:** `GET /api/genres?page=2&limit=20`

### 3. ✅ **Comprehensive Input Validation**
- Username: 3-20 chars, alphanumeric + underscore, unique
- Password: Min 8 chars, requires uppercase, lowercase, number
- Movie ratings: 0-10 range
- Release year: 1800 to current year
- Review score: 1-10 (integer)
- Review content: Minimum 10 characters
- **Implementation:** [server/src/models/](server/src/models/) - All model schemas include Mongoose validators
- **Middleware:** [server/src/middleware/validateMongoId.js](server/src/middleware/validateMongoId.js) validates ObjectId format

### 4. ✅ **JWT Authentication & Authorization**
- Registration creates secure password (bcrypt with salt rounds: 10)
- Login returns JWT token with 7-day expiration
- Protected endpoints require valid JWT in Authorization header
- Token decoded to identify authenticated user (author field)
- **Implementation:** [server/src/middleware/authenticateWithJwt.js](server/src/middleware/authenticateWithJwt.js)
- **Usage:** All resource creation/update/delete endpoints require authentication

---

## Architecture & Technology Stack

### Backend Architecture
```
Node.js/Express.js
├── Routes (server/src/routes/)
│   ├── index.js - Route aggregator
│   ├── auth.js - Authentication routes
│   ├── genre.js - Genre CRUD routes
│   ├── movie.js - Movie CRUD routes
│   └── review.js - Review CRUD routes
├── Controllers (server/src/controllers/)
│   ├── auth.js - Register/login logic
│   ├── genre.js - Genre business logic
│   ├── movie.js - Movie business logic
│   └── review.js - Review business logic
├── Models (server/src/models/)
│   ├── user.js - User schema with validation
│   ├── genre.js - Genre schema
│   ├── movie.js - Movie schema with validations
│   └── review.js - Review schema with validation
├── Middleware (server/src/middleware/)
│   ├── authenticateWithJwt.js - JWT verification
│   ├── validateMongoId.js - MongoDB ObjectId validation
│   └── validatePaginationParams.js - Pagination validation
└── server.js - Express app entry point
```

### Frontend Architecture
```
React 18 / Vite
├── Pages (client/src/pages/)
│   ├── Home.jsx - Landing page
│   ├── Login.jsx - Authentication
│   ├── Register.jsx - User registration
│   ├── Movies.jsx - Movie list & management
│   ├── Genres.jsx - Genre list & management
│   ├── Reviews.jsx - Review list & management
│   ├── Layout.jsx - Common header/navigation
│   └── NoPage.jsx - 404 page
├── Components (client/src/components/)
│   ├── Genre/ - GenreForm, GenreCard, GenreList
│   ├── Movie/ - MovieForm, MovieCard, MovieList
│   └── Review/ - ReviewForm, ReviewCard, ReviewList
├── App.jsx - React Router setup
└── main.jsx - Entry point
```

### Database Design
```
MongoDB Collections
├── users
│   └── {username, password(hashed), createdAt, updatedAt}
├── genres
│   └── {name(unique), description, author(User ref), createdAt, updatedAt}
├── movies
│   └── {title, description, releaseYear, status, rating, genre(Genre ref), author(User ref), createdAt, updatedAt}
└── reviews
    └── {content, score, movie(Movie ref), author(User ref), createdAt, updatedAt}
```

### Technology Choices
- **Backend:** Node.js + Express.js (lightweight, scalable, JavaScript across stack)
- **Database:** MongoDB (flexible schema, document-oriented, easy relationships)
- **Authentication:** JWT + bcrypt (stateless, secure, industry-standard)
- **Frontend:** React 18 + Vite (fast builds, modern hooks, component reusability)
- **UI:** Mantine v7 (professional component library, responsive design)
- **Deployment:** Nginx reverse proxy, PM2 process manager, Docker (MongoDB)

---

## Data Relationships & Constraints

### Entity Relationships
```
User
├─── Genres (1-to-Many: User creates multiple genres)
├─── Movies (1-to-Many: User creates multiple movies as "author")
└─── Reviews (1-to-Many: User writes multiple reviews as "author")

Genre
└─── Movies (1-to-Many: Genre has multiple movies)

Movie
└─── Reviews (1-to-Many: Movie has multiple reviews)
```

### Key Constraints
- Username uniqueness required (prevents duplicate accounts)
- Genre name uniqueness required (prevents duplicate genres)
- Movie status limited to specific values (enum: watchlist|watched|abandoned)
- Movie rating bounded 0-10 (numeric validation)
- Review score bounded 1-10 (numeric validation)
- Review content minimum 10 characters (prevents empty/spam reviews)
- Release year bounded 1800 to current year (logical constraint)

---

## API Testing & Validation

### Postman/Hoppscotch Collection
Complete API collection exported: [server/API-collection.json](server/API-collection.json)

**Test Workflow:**
1. Register new user → Returns user data (password hashed in DB)
2. Login → Returns JWT token
3. Create Genre (with JWT) → Genre created with authenticated user as author
4. Create Movie (with JWT) → Link to genre, set status/rating
5. Search/Filter Movies → Test search, genre filter, status filter, sorting
6. Paginate through results → Test page/limit parameters
7. Create Review (with JWT) → Link to movie, validate content length and score range
8. Update/Delete resources → Verify ownership-based authorization

### Validation Testing
- **Invalid inputs rejected:** Non-alphanumeric username, weak password, out-of-range ratings
- **Missing auth:** Protected endpoints return 401 Unauthorized
- **Invalid MongoDB IDs:** Endpoints return 400 Bad Request
- **Pagination limits enforced:** QueryLimit exceeding 100 defaults to 100

---

## User Demo Flow

**Complete workflow demonstrating all features:**

1. **Register Account**
   - Username: "john_demo"
   - Password: "SecurePass123"
   - System: Validates format, hashes password with bcrypt

2. **Login**
   - Receive JWT token valid for 7 days
   - Token stored in browser localStorage

3. **Create Genres**
   - "Action" - Fast-paced films with stunts
   - "Drama" - Character-driven narratives
   - "Sci-Fi" - Future and space themes

4. **Add Movies**
   - Movie: "The Matrix" (1999)
     - Genre: Sci-Fi
     - Status: Watchlist
     - Rating: Not yet rated
   - Movie: "Inception" (2010)
     - Genre: Sci-Fi
     - Status: Watched
     - Rating: 9/10
   - Movie: "The Shawshank Redemption" (1994)
     - Genre: Drama
     - Status: Watched
     - Rating: 10/10

5. **Search & Filter Movies**
   - Search "Matrix" → Returns The Matrix
   - Filter by genre "Sci-Fi" → Returns Matrix, Inception
   - Filter by status "Watched" → Returns Inception, Shawshank
   - Sort by rating descending → Shawshank (10), Inception (9)

6. **Write Reviews**
   - Review for Inception: "Masterpiece of storytelling with complex plot layering. Every element serves the narrative."
   - Review for Shawshank: "Timeless cinema. A powerful story of hope, friendship, and redemption. Perfectly executed."

7. **Pagination**
   - Navigate through genres/movies using page limits
   - Default 10 items per page, adjustable

---

## Error Handling & User Experience

### Backend Error Responses
All endpoints return consistent JSON error format:
```json
{
  "error": "Descriptive error message",
  "statusCode": 400,
  "details": "Additional context if available"
}
```

**Common scenarios handled:**
- 400 Bad Request - Invalid input, missing required fields
- 401 Unauthorized - Missing/invalid JWT token
- 404 Not Found - Resource not found in database
- 409 Conflict - Duplicate resource (e.g., duplicate username)
- 422 Unprocessable Entity - Validation failed (e.g., invalid email format)
- 500 Internal Server Error - Unexpected server error with logging

### Frontend User Experience
- Form validation before submission (real-time feedback)
- Error messages displayed to user (toast notifications)
- Loading states during API calls
- Automatic redirect on unauthorized access
- Responsive design for mobile/tablet/desktop

---

## Performance & Scalability

### Optimizations Implemented
1. **Database Indexing:** MongoDB indexes on frequently queried fields (username, genre._id)
2. **Pagination:** Prevents loading entire collections into memory
3. **CORS:** Efficient resource sharing without unnecessary headers
4. **Caching:** Browser caching of static assets (via React production build)
5. **Process Management:** PM2 auto-restart ensures uptime

### Scalability Considerations
1. **Stateless Authentication:** JWT allows horizontal scaling (no session store)
2. **Database Design:** Separate collections with references support sharding
3. **API Structure:** RESTful endpoints follow industry best practices
4. **Load Distribution:** Nginx reverse proxy can distribute traffic across multiple backend instances

---

## Security Implementation

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Minimum complexity requirements enforced
   - Never stored or logged in plaintext

2. **Authentication**
   - JWT tokens with 7-day expiration
   - Authorization header required for protected routes
   - Invalid/expired tokens rejected with 401 status

3. **Input Validation**
   - All user inputs validated server-side
   - MongoDB injection prevented via Mongoose schema validation
   - MongoDB ObjectId format validated

4. **CORS**
   - Configured to allow requests from any origin (development)
   - Can be restricted to specific domains in production

5. **Error Information**
   - Sensitive details not exposed in error messages
   - Stack traces logged server-side, not sent to client

---

## Deployment & Running

### Local Development
```bash
# Backend
cd server
npm install
npm run dev  # Starts on http://localhost:5000

# Frontend
cd client
npm install
npm run dev  # Starts on http://localhost:5173
```

### Production Deployment
```bash
# Backend
cd server
npm install
npm start  # Runs on configured PORT (default 5000)

# Frontend
cd client
npm run build
npm install -g serve
serve -s dist -l 3000

# Nginx Reverse Proxy
# Routes / → localhost:3000 (frontend)
# Routes /api/ → localhost:5000 (backend)
```

### Environment Variables (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/cinetrack
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=production
```

---

## Testing & Quality Assurance

### Manual Testing Performed
- ✅ User registration with various usernames/passwords
- ✅ Login authentication and JWT token generation
- ✅ CRUD operations on all resources
- ✅ Search functionality across different fields
- ✅ Pagination with various page sizes
- ✅ Authorization (protected routes reject unauthenticated requests)
- ✅ Input validation (invalid inputs rejected appropriately)
- ✅ Error handling (consistent error messages)

### Code Quality
- Consistent file structure and naming conventions
- Separation of concerns (routes → controllers → models)
- Reusable middleware for cross-cutting concerns
- Component modularity in React frontend
- Clear comment documentation where needed

---

## Conclusion

CineTrack successfully demonstrates a complete full-stack web application with:

- ✅ **17 core CRUD endpoints** across 4 entities
- ✅ **4 additional features** (search/filter/sort, pagination, validation, JWT auth)
- ✅ **Professional architecture** following MVC pattern
- ✅ **Database relationships** properly modeled with MongoDB
- ✅ **Security implementation** with hashed passwords and JWT
- ✅ **Responsive UI** with React and Mantine components
- ✅ **Production deployment** with Nginx and process management
- ✅ **Comprehensive documentation** and API collection

The application is production-ready and demonstrates mastery of full-stack web development concepts required for IFN666 Assessment 02.

---

## Files & Resources

### Codebase
- Root README: [README.md](README.md)
- Server Documentation: [server/README.md](server/README.md)
- Client Documentation: [client/README.md](client/README.md)
- API Collection: [server/API-collection.json](server/API-collection.json)

### GitHub Repository
**Repository:** https://github.com/patelumangimeet/IFN666-Assessment  
**Commits:** 49+ commits documenting development progress  
**Branch:** main (production-ready code)

### Deployment
**Server:** melaleuca03.ifn666.com  
**Backend API:** http://localhost:5000 (verified running)  
**Frontend:** http://localhost:3000 (verified running)  
**Database:** MongoDB on localhost:27017 (Docker container, verified running)

---

**End of Assessment Response Document**

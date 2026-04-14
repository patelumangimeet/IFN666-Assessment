# CineTrack - Movie Watchlist Web Application

A full-stack movie watchlist and review web application that allows users to register, log in, create genres, add movies, organize them by genre, mark movies as watched or unwatched, and write reviews with ratings.

## Project Overview

CineTrack is built with a modern web stack featuring Node.js/Express backend connected to MongoDB, and a React/Vite frontend with Mantine UI components. The application demonstrates full CRUD operations, JWT authentication, pagination, search/sort capabilities, and responsive design.

## Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local installation or remote connection)
- npm or yarn

### Setup Backend

```bash
cd server
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/cinetrack
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

Start development server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Setup Frontend

```bash
cd client
npm install
```

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Project Structure

```
IFN666-Assessment/
├── server/
│   ├── src/
│   │   ├── controllers/      # Business logic for each resource
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoint definitions
│   │   └── middleware/      # Authentication & validation
│   ├── .env
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── README.md
├── client/
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Route pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── API-collection.json       # Postman/Hoppscotch API export
└── README.md
```

## Database Schema

### User
```javascript
{
  username: String (unique, required),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Genre
```javascript
{
  name: String (unique, required),
  description: String,
  author: ObjectId -> User,
  createdAt: Date,
  updatedAt: Date
}
```

### Movie
```javascript
{
  title: String (required),
  description: String,
  releaseYear: Number (1800-present),
  status: String (watchlist|watched|abandoned),
  rating: Number (0-10),
  genre: ObjectId -> Genre,
  author: ObjectId -> User,
  createdAt: Date,
  updatedAt: Date
}
```

### Review
```javascript
{
  content: String (min 10 chars, required),
  score: Number (1-10, required),
  movie: ObjectId -> Movie,
  author: ObjectId -> User,
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features

### Backend (17+ CRUD Endpoints)
- **Authentication**: JWT-based register/login
- **Genres**: Create, read, update, delete (5 endpoints)
- **Movies**: Full CRUD with search, sort, filter, pagination (5 endpoints)
- **Reviews**: Full CRUD with pagination (5 endpoints)
- **Middleware**: JWT validation, MongoDB ID validation, pagination handling
- **Validation**: Input validation on all resources
- **Error Handling**: Consistent JSON error responses

### Frontend
- **User Auth**: Register and login with JWT
- **Movie Management**: Browse, search, sort, filter, edit, delete, paginate
- **Genre Management**: View, create, edit, delete genres
- **Review System**: Read, create, edit, delete reviews
- **Responsive Design**: Mobile, tablet, and desktop views
- **Form Validation**: Real-time user feedback

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Genres (must be authenticated to create/update/delete)
- `GET /api/genres?page=1&limit=10` - List all genres
- `GET /api/genres/:id` - Get genre details
- `POST /api/genres` - Create genre
- `PUT /api/genres/:id` - Update genre
- `DELETE /api/genres/:id` - Delete genre

### Movies (must be authenticated to create/update/delete)
- `GET /api/movies?page=1&limit=10&search=title&genre=id&status=watched&sortBy=title&order=asc` - List movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Create movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

### Reviews (must be authenticated to create/update/delete)
- `GET /api/reviews?page=1&limit=10&movie=id` - List reviews
- `GET /api/reviews/:id` - Get review details
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## User Demo Flow

1. **Register**: Create account with username/password
2. **Login**: Receive JWT token
3. **Create Genre**: Add "Action" genre
4. **Add Movie**: Create movie "The Matrix" under Action genre
5. **Update Movie**: Mark as "watched" and rate 9/10
6. **Write Review**: Add review with score
7. **Search**: Find movies by title
8. **Sort**: Order movies by rating
9. **Pagination**: Navigate through pages
10. **Logout**: Clear session

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **Development**: npm scripts with nodemon watch

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **UI Library**: Mantine v7
- **HTTP Client**: Axios
- **Icons**: Tabler Icons

## Validation Rules

- **Username**: 3-20 chars, alphanumeric + underscore, unique
- **Password**: Min 8 chars, requires uppercase, lowercase, number
- **Genre Name**: Required, unique
- **Movie Title**: Required
- **Release Year**: Between 1800 and current year
- **Movie Status**: Must be watchlist|watched|abandoned
- **Review Content**: Minimum 10 characters
- **Review Score**: Integer between 1-10
- **Genre Description**: Optional, max 500 chars

## Running Tests

To test the API endpoints:

1. Use Postman or Hoppscotch with the `API-collection.json` file
2. Test register endpoint first to create a user
3. Copy the JWT token from response
4. Use token in Authorization header for protected endpoints
5. Test CRUD operations on all resources
6. Test search/sort/filter on movies endpoint
7. Test pagination with different page/limit values

## Deployment

### Backend Deployment
- Deploy to Heroku, AWS, DigitalOcean, etc.
- Update MONGODB_URI to point to remote database
- Set NODE_ENV=production
- Use strong JWT_SECRET

### Frontend Deployment
- Build: `npm run build`
- Deploy dist/ folder to Vercel, Netlify, AWS S3, etc.
- Update VITE_API_URL to deployed backend API

## Additional Commands

### Server
```bash
npm run start   # Production server
npm run dev     # Development with auto-reload
```

### Client
```bash
npm run dev     # Development server
npm run build   # Production build
npm run preview # Preview production build
```

## Documentation

- [Server README](server/README.md) - Backend API documentation
- [Client README](client/README.md) - Frontend documentation
- [API Collection](API-collection.json) - Postman/Hoppscotch collection

## Best Practices Demonstrated

- RESTful API design
- Layered architecture (routes → controllers → models)
- JWT authentication
- Input validation and error handling
- Component-based UI architecture
- Environment-based configuration
- Pagination for scalability
- Search and sort functionality
- Responsive design

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `mongod`
- Verify .env file has MONGODB_URI
- Check port 5000 isn't already in use

### Frontend API calls failing
- Verify backend is running on http://localhost:5000
- Check .env has correct VITE_API_URL
- Check browser console for CORS errors

### Database connection issues
- Ensure MongoDB is installed and running
- Verify connection string in .env
- Check database name (should be "cinetrack")

## License

MIT

## Author

Built for IFN666 Assessment 02 (2026)

---

**Start the full application**: 
1. `cd server && npm run dev`
2. `cd client && npm run dev`
3. Navigate to `http://localhost:5173`

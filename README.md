# Assignment 2 - Web API.

Name: MingHao Meng

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + JWT-based Authentication
 + Favorites Collection in MongoDB
 + User-Specific Favorite Management    
 + Protected Routes in Frontend
 + Login and Registration Endpoints
 + Integration with MongoDB
 + Enhanced Frontend-Backend Communication

## Setup requirements.

1. Install Node.js and MongoDB
Ensure that Node.js (v14 or later) and MongoDB (local or cloud instance) are installed on your system.

2. Backend Setup
Navigate to the movies-api directory:
## cd movies-api

Create a .env file in the movies-api directory with the following content:
## PORT=8080
## TMDB_KEY=your_tmdb_api_key
## SECRET=your_jwt_secret
## MONGO_URL=your_mongodb_connection_string

Install the required dependencies:
## npm install

Start the backend server:
## npm run dev


3. Frontend Setup
Navigate to the react-movies directory
## cd react-movies

Install the required dependencies:
## npm install

Create a .env file in the react-movies directory with the following content:
## REACT_APP_TMDB_KEY=your_tmdb_api_key

Start the React application:
## npm start


## API Configuration

Before running the API, you need to configure the environment variables by creating a .env file in the movies-api directory. Below is an example of the required variables and how to set them up:
______________________
NODEENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoDBConnectionURL
seedDb=true
TMDB_KEY=YourTMDBApiKey
SECRET=YourJWTSecret
______________________

## API Design

- /api/movies | GET | Gets a list of movies 
- /api/movies/{id} | GET | Gets detailed information for a specific movie
- /api/movies/{id}/reviews | GET | Gets all reviews for a specific movie
- /api/movies/{id}/reviews | POST | Creates a new review for a specific movie
- /api/movies/favorites/{userId} | GET | Gets the favorite movies of a specific user
- /api/movies/favorites | POST | Adds a movie to the user's favorites
- /api/movies/favorites/{userId}/{movieId} | DELETE | Removes a movie from the user's favorites
- /api/users?action=login | POST | Authenticates a user and generates a token
- /api/users?action=register | POST | Registers a new user
- /api/movies/tmdb/discover | GET | Fetches a list of movies from TMDB
- /api/movies/tmdb/movie/{id} | GET | Fetches detailed information for a specific TMDB movie
- /api/movies/tmdb/movie/{id}/images | GET | Gets images for a specific TMDB movie
- /api/movies/tmdb/movie/{id}/reviews | GET | Gets reviews for a specific TMDB movie
- /api/movies/tmdb/movie/{id}/credits | GET | Gets credits for a specific TMDB movie
- /api/movies/tmdb/now-playing | GET | Gets a list of currently playing movies
- /api/movies/tmdb/trending | GET | Gets a list of trending movies


## Security and Authentication

The API implements JWT-based authentication to ensure secure access to protected routes. Below are the details of the security and authentication mechanisms:
1. Authentication Method
JSON Web Tokens (JWT):
Upon successful login, the server generates a JWT token signed with a secret key.
The token is included in the Authorization header (format: Bearer <token>) of each request to protected routes.
The token is validated on the server for authenticity and expiration before granting access.
2. Protected Routes
The following routes are protected and require a valid JWT token to access:
- /api/movies/favorites/{userId} | GET | Requires token for fetching favorite movies
- /api/movies/favorites | POST | Requires token for adding a favorite movie
- /api/movies/favorites/{userId}/{movieId} | DELETE | Requires token for removing a favorite movie
- /api/movies/tmdb/discover | GET | Requires token for fetching movies
- /api/movies/tmdb/movie/{id} | GET | Requires token for fetching movie details
- /api/movies/tmdb/movie/{id}/images | GET | Requires token for fetching movie images
- /api/movies/tmdb/movie/{id}/reviews | GET | Requires token for fetching movie reviews
- /api/movies/tmdb/movie/{id}/credits | GET | Requires token for fetching movie credits
- /api/movies/tmdb/now-playing | GET | Requires token for fetching now-playing movies
- /api/movies/tmdb/trending | GET | Requires token for fetching trending movies
3. Implementation Details

Login Endpoint (/api/users?action=login):
Users log in by providing a valid username and password.
A JWT token is generated and returned upon successful authentication.

Authentication Middleware:
The authenticate middleware is used to validate the JWT token on protected routes.

Token Validation:
The token is extracted from the Authorization header.
The server verifies the token using the secret key.
If the token is invalid, expired, or missing, the request is rejected with an appropriate error response.


## Integrating with React App
Integrating with React App
Integration Process
The React app was updated to communicate with the backend API for user authentication and movie management. This integration replaced TMDB API calls in several views with the custom backend API while maintaining the functionality of fetching movie data.

# Views Using the Backend API
The following views in the React app now use the custom Web API instead of the TMDB API:

1. Favorites Page (/movies/favorites):

Fetches the user's favorite movies from the backend using the /api/movies/favorites/{userId} endpoint.
Allows adding or removing movies to/from the favorites list using /api/movies/favorites (POST) and /api/movies/favorites/{userId}/{movieId} (DELETE).
2. Login Page (/login):

Authenticates users by sending credentials to /api/users?action=login.
Stores the returned JWT token in sessionStorage.
3. Movie Details Page (/movies/:id):

Fetches detailed information about a movie using the /api/movies/tmdb/movie/{id} endpoint.
4. Now Playing Page (/movies/NowPlayingMovies):

Displays currently playing movies fetched from /api/movies/tmdb/now-playing.
5. Trending Movies Page (/movies/trendingToday):

Fetches trending movies from the backend via /api/movies/tmdb/trending.
6. Upcoming Movies Page (/movies/upcoming):

Uses /api/movies/tmdb/discover to fetch a list of upcoming movies.

# Updates from Assignment One
1. User Authentication:

Integrated a login and registration system using the /api/users endpoints.
Protected views (e.g., Favorites) to ensure only logged-in users can access them.
2. Dynamic Token Management:

Stored JWT tokens in sessionStorage to authenticate API requests.
Automatically added Authorization headers in API calls.
3. Favorites Functionality:

Added the ability for users to add, view, and remove favorite movies, with data stored in a MongoDB favorites collection.
4. Protected Routes:

Implemented route guarding in the React app. Users are redirected to the login page if they attempt to access protected views without a valid token.
5. Backend Integration:

Replaced TMDB API calls with backend API endpoints for all movie-related data.
Unified data fetching through the backend to ensure consistent authentication and authorization.


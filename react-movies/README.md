Name: MingHao Meng

Overview
This repository contains the React Movie Labs application, a platform for exploring and managing movies using ReactJS and Firebase. The application provides features for browsing movies, filtering, sorting, favoriting, and managing a watchlist, alongside authentication using Google login.

Features
Movie Browsing: Explore popular, upcoming, trending, and now-playing movies with a paginated interface.
Filtering and Sorting:
Filter by movie genres (e.g., Action, Comedy).
Filter by ratings (e.g., movies rated 8+).
Sort movies by popularity (Most Popular/Least Popular).
Pagination: Paginated movie browsing for seamless exploration.
Authentication:
Google login using Firebase for personalized features.
Displays user information (name and avatar) upon login.
Favorites and Watchlist:
Add movies to a favorites list or watchlist for later access.
View and manage your personalized lists.
Responsive Design: Adaptable UI built with Material-UI for optimal usability on all devices.



Setup Requirements
Prerequisites:
Install Node.js (v14 or later recommended).
Install npm or yarn as a package manager.
Clone the Repository:
git clone <repository-url>
cd react-movie-labs

Install Dependencies:
npm install
Set Up Environment Variables:
Create a .env file in the root directory with the following content:

REACT_APP_TMDB_KEY=<Your TMDB API Key>
REACT_APP_FIREBASE_API_KEY=<Your Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID=<Your Firebase Project ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<Your Firebase Storage Bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Messaging Sender ID>
REACT_APP_FIREBASE_APP_ID=<Your Firebase App ID>
Run the Development Server:
npm start


API Endpoints
TMDB Endpoints
Discover Movies: /discover/movie
Trending Movies: /trending/movie/day
Upcoming Movies: /movie/upcoming
Now Playing Movies: /movie/now_playing
Movie Details: /movie/:id
Genres: /genre/movie/list

Routing
Public Routes
/: Home page showcasing popular movies.
/upcoming: Displays a list of upcoming movies.
/trending: Displays movies trending today with sorting options.
/nowPlayingMovies: Displays movies currently playing in theaters.
/favorites: Displays the user's favorited movies (requires authentication).
Authentication
Protected Routes:
/favorites: Requires Google login to access.
Public Routes:
/, /upcoming, /trending, /nowPlayingMovies: Accessible without login.



Independent Learning
Below are the new technologies and techniques researched and implemented during this project:

Firebase Authentication:

Integrated Google Sign-In for authentication.
Managed user sessions and protected routes.
Relevant files: src/firebase.js, src/components/LoginButton.js
Reference: Firebase Authentication Docs
React Query:

Used for efficient server state management, API caching, and fetching movie data.
Relevant files: src/pages/*.js, src/api/tmdb-api.js
Reference: React Query Docs
Material-UI:

Built responsive components, including pagination, buttons, and forms.
Relevant files: src/components/templateMovieListPage.js, src/components/filterMoviesCard.js
Reference: Material-UI Docs
Pagination:

Implemented dynamic movie pagination using Material-UI and React state.
Relevant files: src/pages/*.js, src/components/templateMovieListPage.js
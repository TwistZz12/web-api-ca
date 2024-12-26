export const getGenres = async() => {
    const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/genres', {
      headers: {
        'Authorization': window.localStorage.getItem('token')
      }
    }
    )
    return response.json();
};

export const getUpcomingMovies = async () => {
  const response = await fetch(
      'http://localhost:8080/api/movies/tmdb/upcoming',
      {
          headers: {
              'Authorization': window.localStorage.getItem('token')
          }
      }
  );
  return response.json();
};

export const getMovies = async () => {
  const response = await fetch(
      'http://localhost:8080/api/movies//tmdb/discover',
      {
          headers: {
              'Authorization': window.localStorage.getItem('token')
          }
      }
  );
  return response.json();
};

export const getMovie = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}`, 
      {
          headers: {
              'Authorization': window.localStorage.getItem('token')
          }
      }
  );

  if (!response.ok) {
      throw new Error("Failed to fetch movie");
  }

  return response.json();
};


export const getMovieImages = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/images`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getMovieTrending = async (page = 1) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/trending?page=${page}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};


export const getCredits = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/credits`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getNowPlayingMovies = async (page = 1) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/now-playing?page=${page}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getVideos = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/movie/${id}/videos`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getActorDetails = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/actor/${id}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const getActorMovies = async (id) => {
  const response = await fetch(
      `http://localhost:8080/api/movies/tmdb/actor/${id}/movies`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });
  return response.json();
};

export const addFavorite = async (favorite) => {
  const response = await fetch('http://localhost:8080/api/movies/favorites', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': window.localStorage.getItem('token')
      },
      body: JSON.stringify(favorite)
  });

  if (!response.ok) {
      throw new Error('Failed to add favorite');
  }

  return response.json();
};

export const getFavorites = async (userId) => {
  const response = await fetch(`http://localhost:8080/api/movies/favorites/${userId}`, {
      headers: {
          'Authorization': window.localStorage.getItem('token')
      }
  });

  if (!response.ok) {
      throw new Error('Failed to fetch favorites');
  }

  return response.json();
};

export const removeFavorite = async (userId, movieId) => {
  const response = await fetch(`http://localhost:8080/api/movies/favorites/${userId}/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: window.localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to remove favorite");
  }

  return response.json();
};


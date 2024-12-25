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
export const getGenres = async() => {
  const response = await fetch(
    'http://localhost:8080/api/movies/tmdb/genres', {
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
            'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
            'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
            'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getMovieReviews = async (id) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/movie/${id}/reviews`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getMovieTrending = async (page = 1) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/trending?page=${page}`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};


export const getCredits = async (id) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/movie/${id}/credits`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getNowPlayingMovies = async (page = 1) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/now-playing?page=${page}`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getVideos = async (id) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/movie/${id}/videos`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getActorDetails = async (id) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor/${id}`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const getActorMovies = async (id) => {
const response = await fetch(
    `http://localhost:8080/api/movies/tmdb/actor/${id}/movies`, {
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
    }
});
return response.json();
};

export const addFavorite = async (favorite) => {
const response = await fetch('http://localhost:8080/api/movies/favorites', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
        'Authorization': `Bearer ${window.localStorage.getItem('token')}` 
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
    Authorization: `Bearer ${window.localStorage.getItem("token")}` 
  },
});

if (!response.ok) {
  throw new Error("Failed to remove favorite");
}

return response.json();
};


export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();
const token = data.token.split(" ")[1]; // 去掉 "BEARER"
window.localStorage.setItem('token', token);
  return token;
};

export const register = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users?action=register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Registration failed');
  }

  return await response.json();
};



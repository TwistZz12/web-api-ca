import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error((await response.json()).message); 
        }

        return await response.json(); 
    } catch (error) {
        throw error; 
    }
};

export const getMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        throw error;
    }
};

export const getMovie = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json(); 
    } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error.message);
        throw error;
    }
};

export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching movie images for ID ${id}:`, error.message);
        throw error;
    }
};


export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching reviews for movie ID ${id}:`, error.message);
        throw error;
    }
};


export const getMovieTrending = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching trending movies for page ${page}:`, error.message);
        throw error;
    }
};

export const getCredits = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.status_message || "Something went wrong");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching credits for movie ID ${id}:`, error.message);
        throw error;
    }
};

export const getNowPlayingMovies = async (page = 1) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch now playing movies");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching now playing movies for page ${page}:`, error.message);
        throw error;
    }
};

export const getVideos = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch video data");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching videos for movie ID ${id}:`, error.message);
        throw error;
    }
};

export const getActorDetails = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch actor details");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching actor details for ID ${id}:`, error.message);
        throw error;
    }
};

export const getActorMovies = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch actor's movies");
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching movies for actor ID ${id}:`, error.message);
        throw error;
    }
};
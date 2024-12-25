import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getMovieGenres,
    getMovies,
    getMovie,
    getMovieImages,
    getMovieReviews,
    getMovieTrending,
    getCredits,
    getNowPlayingMovies,
    getVideos,
    getActorDetails,
    getActorMovies
} from '../tmdb-api';

const router = express.Router();

// Get all movies with pagination
router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; // Convert to numeric values

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); // Calculate total number of pages

    // Construct return object and insert into response
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details by ID
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

// Get upcoming movies from TMDB
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

// Get genres from TMDB
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getMovieGenres(); 
    res.status(200).json(genres);
}));

// Get movies from TMDB with pagination
router.get('/tmdb/discover', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const movies = await getMovies(page); 
    res.status(200).json(movies); 
}));

// Get movie details by ID
router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movie = await getMovie(id);
    res.status(200).json(movie);
}));

// Get movie images by ID
router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const images = await getMovieImages(id);
    res.status(200).json(images);
}));

// Get reviews by ID
router.get('/tmdb/movie/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.status(200).json(reviews);
}));

// Get trending
router.get('/tmdb/trending', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const trendingMovies = await getMovieTrending(page);
    res.status(200).json(trendingMovies);
}));

// Get credits by ID
router.get('/tmdb/movie/:id/credits', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const credits = await getCredits(id);
    res.status(200).json(credits);
}));

// Get now-playing by ID
router.get('/tmdb/now-playing', asyncHandler(async (req, res) => {
    const { page = 1 } = req.query;
    const nowPlayingMovies = await getNowPlayingMovies(page);
    res.status(200).json(nowPlayingMovies);
}));

// Get videos by ID
router.get('/tmdb/movie/:id/videos', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const videos = await getVideos(id);
    res.status(200).json(videos);
}));

// Get actor
router.get('/tmdb/actor/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorDetails = await getActorDetails(id);
    res.status(200).json(actorDetails);
}));

// Get movies which the actor have acted
router.get('/tmdb/actor/:id/movies', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const actorMovies = await getActorMovies(id);
    res.status(200).json(actorMovies);
}));

export default router;

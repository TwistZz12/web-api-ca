import React, { useState } from "react";
import { addFavorite, removeFavorite } from "../api/moviesApi";


export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  const addToFavorites = async (movie) => {
    try {
      await addFavorite({ userId: "12345", movieId: movie.id, movieTitle: movie.title }); 
      setFavorites((prev) => [...prev, movie.id]); 
    } catch (error) {
      console.error("Failed to add favorite:", error.message);
    }
  };

  const removeFromFavorites = async (movie) => {
    try {
      await removeFavorite("12345", movie.id); 
      setFavorites((prev) => prev.filter((mId) => mId !== movie.id)); 
    } catch (error) {
      console.error("Failed to remove favorite:", error.message);
    }
  };

  const [myReviews, setMyReviews] = useState({});

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (movie) => {
    if (!watchList.includes(movie.id)) {
      setWatchList((prev) => [...prev, movie.id]);
      console.log(`Watchlist: ${[...watchList, movie.id]}`);
    }
  };

  const removeFromWatchList = (movie) => {
    setWatchList(watchList.filter((mId) => mId !== movie.id));
    console.log(`Watchlist: ${watchList.filter((mId) => mId !== movie.id)}`);
  };

  return (
    <MoviesContext.Provider
    value={{
      favorites,
      addToFavorites, 
      removeFromFavorites, 
      addReview,
      watchList,
      addToWatchList,
      removeFromWatchList,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
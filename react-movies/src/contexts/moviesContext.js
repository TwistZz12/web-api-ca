import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
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

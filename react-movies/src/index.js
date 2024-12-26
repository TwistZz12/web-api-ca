import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/UpcomingMoviesPage";
import TrendingTodayPage from "./pages/trendingTodayPage";
import NowPlayingPage from "./pages/NowPlayingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const isAuthenticated = () => {
    const token = window.localStorage.getItem("token");
    return !!token;
  };
  return (
    <QueryClientProvider client={queryClient}>
 <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            {/* 添加受保护的路由 */}
            <Route
              path="/movies/favorites"
              element={
                isAuthenticated() ? <FavoriteMoviesPage /> : <Navigate to="/login" />
              }
            />
            {/* 其他页面 */}
            <Route path="/movies/trendingToday" element={<TrendingTodayPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/actor/:id" element={<ActorDetailsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/NowPlayingMovies" element={<NowPlayingPage />} />
            {/* 登录页面 */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);

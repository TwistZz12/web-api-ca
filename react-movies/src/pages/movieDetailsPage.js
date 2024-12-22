import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getCredits, getVideos } from "../api/tmdb-api"; 
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import CastList from "../components/castList";

const MovieDetailsPage = (props) => {
  const { id } = useParams();

  // 获取电影详情
  const { data: movie, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery(
    ["movie", { id: id }],
    getMovie
  );

  // 获取演员信息
  const { data: credits, error: creditsError, isLoading: creditsLoading, isError: creditsIsError } = useQuery(
    ["credits", { id: id }],
    getCredits
  );

  // 获取视频信息
  const { data: videos, error: videosError, isLoading: videosLoading, isError: videosIsError } = useQuery(
    ["videos", { id: id }],
    getVideos
  );

  if (movieLoading || creditsLoading || videosLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError.message}</h1>;
  }

  if (videosIsError) {
    return <h1>{videosError.message}</h1>;
  }

  return (
    <PageTemplate movie={movie}>
      <MovieDetails movie={movie} videos={videos.results} />
      <CastList cast={credits.cast.slice(0, 12)} />
    </PageTemplate>
  );
};

export default MovieDetailsPage;

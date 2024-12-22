import React, { useState } from "react";
import { useQuery } from "react-query";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList"; // 引入图标组件
import Pagination from "@mui/material/Pagination"; // Material-UI 分页组件

const NowPlayingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery(
    ["nowPlayingMovies", currentPage],
    () => getNowPlayingMovies(currentPage),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 使用 PageTemplate 并传递 AddToWatchListIcon 作为 action */}
      <PageTemplate
        title="Now Playing Movies"
        movies={movies}
        action={(movie) => <AddToWatchListIcon movie={movie} />}
      />

      {/* 分页控件 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={data.total_pages} // 总页数
          page={currentPage} // 当前页
          onChange={handlePageChange} // 页码切换
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default NowPlayingMoviesPage;

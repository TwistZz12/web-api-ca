import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import Pagination from "@mui/material/Pagination"; // Material-UI 分页组件

const UpcomingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery(
    ["upcomingMovies", currentPage],
    () => getUpcomingMovies(currentPage),
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
      <PageTemplate
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => <AddToWatchListIcon movie={movie} />}
      />

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

export default UpcomingMoviesPage;

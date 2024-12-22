import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Pagination from "@mui/material/Pagination"; // 引入 MUI Pagination
import Box from "@mui/material/Box"; // 引入 MUI Box，用于布局

const ActorDetailsPage = () => {
  const { id } = useParams();

  // 定义分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // 每页显示电影数量

  // 获取演员详细信息
  const { data: actor, error: actorError, isLoading: actorLoading, isError: actorIsError } = useQuery(
    ["actor", { id }],
    getActorDetails
  );

  // 获取演员电影列表
  const { data: movies, error: moviesError, isLoading: moviesLoading, isError: moviesIsError } = useQuery(
    ["actorMovies", { id }],
    getActorMovies
  );

  if (actorLoading || moviesLoading) return <Spinner />;
  if (actorIsError) return <h1>Error: {actorError.message}</h1>;
  if (moviesIsError) return <h1>Error: {moviesError.message}</h1>;

  // 计算分页数据
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedMovies = movies.cast.slice(startIndex, endIndex);
  const totalPages = Math.ceil(movies.cast.length / moviesPerPage);

  // 处理分页
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {/* 演员详细信息 */}
      <h1>{actor.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
        alt={actor.name}
        style={{ borderRadius: "8px" }}
      />
      <p><strong>Biography:</strong></p>
      <p>{actor.biography || "No biography available."}</p>
      <p><strong>Birthday:</strong> {actor.birthday || "Unknown"}</p>
      <p><strong>Place of Birth:</strong> {actor.place_of_birth || "Unknown"}</p>
      <p><strong>Popularity:</strong> {actor.popularity}</p>

      {/* 演员出演的电影分页展示 */}
      <h2>Movies</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
        {paginatedMovies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ width: "150px", textAlign: "center" }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ borderRadius: "8px", width: "100%" }}
              />
              <p>{movie.title}</p>
              <p>({movie.release_date ? movie.release_date.split("-")[0] : "N/A"})</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 美化分页 */}
      <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary" // 更改颜色
          size="large" // 设置分页按钮大小
        />
      </Box>
    </div>
  );
};

export default ActorDetailsPage;

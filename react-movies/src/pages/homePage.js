import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites"; // 喜欢的图标
import AddToWatchListIcon from "../components/cardIcons/addToWatchList"; // 添加到观看列表的图标
import Pagination from "@mui/material/Pagination"; // Material-UI 分页组件
import LoginButton from "../components/LoginButton"; // 引入 LoginButton 组件

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页状态

  // 使用 React Query 调用 API 并管理缓存
  const { data, error, isLoading, isError } = useQuery(
    ["discoverMovies", currentPage], // 缓存 key，包含页码
    () => getMovies(currentPage), // 动态请求当前页数据
    { keepPreviousData: true } // 保留前一页数据
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results; // 当前页的电影数据

  // 分页切换处理函数
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 添加登录按钮 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <h1 style={{ margin: 0 }}>Discover Movies</h1>
        <LoginButton />
      </div>

      {/* 页面模板，渲染电影列表 */}
      <PageTemplate
        title=""
        movies={movies}
        action={(movie) => (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <AddToFavoritesIcon movie={movie} /> {/* 原来的喜欢图标 */}
            <AddToWatchListIcon movie={movie} /> {/* 新增的添加到观看列表图标 */}
          </div>
        )}
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

export default HomePage;

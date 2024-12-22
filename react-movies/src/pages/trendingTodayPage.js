import React, { useState } from "react";
import { useQuery } from "react-query";
import { getMovieTredning } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import AddToWatchListIcon from "../components/cardIcons/addToWatchList"; // 引入图标组件
import Pagination from "@mui/material/Pagination"; // Material-UI 分页组件
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const TrendingTodayPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // 当前页
  const [sortOrder, setSortOrder] = useState("popularity.desc"); // 排序规则

  const { data, error, isLoading, isError } = useQuery(
    ["trendingToday", currentPage],
    () => getMovieTredning(currentPage),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  let movies = data.results; // 当前页的电影数据

  // 前端排序逻辑
  if (sortOrder === "popularity.desc") {
    movies = movies.sort((a, b) => b.popularity - a.popularity); // 按流行度降序
  } else if (sortOrder === "popularity.asc") {
    movies = movies.sort((a, b) => a.popularity - b.popularity); // 按流行度升序
  }

  const totalPages = data.total_pages; // API 返回的总页数

  // 处理分页切换
  const handlePageChange = (event, page) => {
    setCurrentPage(page); // 更新当前页
  };

  // 处理排序规则变化
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // 更新排序规则
    setCurrentPage(1); // 重置到第一页
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 排序功能 */}
      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5" component="div">
          Trending Today
        </Typography>
        <FormControl style={{ width: "200px" }}>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            displayEmpty
            inputProps={{ "aria-label": "Sort by" }}
          >
            <MenuItem value="popularity.desc">Most Popular</MenuItem>
            <MenuItem value="popularity.asc">Least Popular</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* 显示电影列表 */}
      <PageTemplate
        title=""
        movies={movies}
        action={(movie) => <AddToWatchListIcon movie={movie} />} // 添加图标组件
      />

      {/* 分页控件 */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Pagination
          count={totalPages} // 总页数
          page={currentPage} // 当前页
          onChange={handlePageChange} // 分页回调
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default TrendingTodayPage;

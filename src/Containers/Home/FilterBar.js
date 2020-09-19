import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import queryString from 'query-string';

function FilterBar() {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const history = useHistory();
  const genres = useSelector((state) => state.genres);

  const changeGenre = useCallback((e) => {
    params.genre = e.target.value;
    history.push(`/search?${queryString.stringify(params)}`);
    // eslint-disable-next-line
  }, []);

  const changeSortBy = useCallback((e) => {
    params.sortBy = e.target.value;
    history.push(`/search?${queryString.stringify(params)}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex justify-content-end">
      <FormControl>
        <InputLabel shrink>Thể loại</InputLabel>
        <Select defaultValue={params.genre || 'all'} onChange={changeGenre}>
          <MenuItem value="all">Tất cả</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.slug} value={genre.slug}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className="ml-4">
        <InputLabel shrink>Xếp theo</InputLabel>
        <Select
          defaultValue={params.sortBy || 'newest'}
          onChange={changeSortBy}
        >
          <MenuItem value="newest">Mới đăng</MenuItem>
          <MenuItem value="popularity">Phổ biến</MenuItem>
          <MenuItem value="rating">Xếp hạng</MenuItem>
          <MenuItem value="trending">Xu hướng</MenuItem>
          <MenuItem value="year">Năm</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterBar;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Search.css';

function Search() {
  const navigate = useNavigate();
  const [preValue, setPreValue] = useState('');
  const [value, setValue] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [selectIndex, setSelectIndex] = useState();

  const getSearchedMovies = async () => {
    if (!value.trim()) {
      setMovieList([]);
      setSelectIndex();
      return;
    }
    if (preValue === value.trim()) return;
    setPreValue(value);
    const {
      data: {
        data: {
          movies
        }
      }
    } = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${value}`);
    setMovieList(movies);
    setSelectIndex();
  }

  useEffect(() => {
    getSearchedMovies();
  }, [value]);

  const isArrowKey = (e) => {
    const key = e.key;
    const length = movieList?.length;
    if (!length) return;
    if (key === 'ArrowUp') {
      if (!selectIndex) {
        setSelectIndex(length - 1);
      } else {
        setSelectIndex(selectIndex - 1);
      }
    } else if (key === 'ArrowDown') {
      if (selectIndex === undefined || selectIndex === length - 1) {
        setSelectIndex(0);
      } else {
        setSelectIndex(selectIndex + 1);
      }
    } else if (key === 'Enter') {
      if (selectIndex === undefined) return;
      const data = movieList[selectIndex];
      navigate('/movie-detail', { state: {id: data.id} });
    }
  }

  const onClickSearchList = () => {
    const data = movieList[selectIndex];
    navigate('/movie-detail', { state: {id: data.id} });
  }

  return (
    <>
      <input
        className="searchBar"
        type="text"
        placeholder="insert search content"
        value={value}
        onKeyDown={(e) => isArrowKey(e)}
        onChange={(e) => setValue(e.target.value)}
      />
      
        <ul className="searchUl">
          {movieList?.map((movie, i) => {
            return (
              selectIndex === i ? 
                  <li className="searchLi select" 
                      onMouseMove={() => setSelectIndex(i)}
                      onClick={onClickSearchList}
                      key={i}>{movie.title}</li>
                : <li className="searchLi" 
                      onMouseMove={() => setSelectIndex(i)} 
                      onClick={onClickSearchList}
                      key={i}>{movie.title}</li>
            )
          })}
        </ul>
      
    </>
  )
}

export default Search;
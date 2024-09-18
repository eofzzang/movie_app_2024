import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import Loading from '../components/Loading';
import Search from '../components/Search';
import './Home.css';

function Home () {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const getMovies = async () => {
    setIsLoading(true);
    const {
      data: {
        data: { movies },
      }
    } = await axios.get(`https://yts.mx/api/v2/list_movies.json?sort_by=rating&page=${pageNumber}`);
    setIsLoading(false);
    setMovieList([...movieList, ...movies]);
  }

  // useEffect(() => {
  //   getMovies();
  //   return () => {
  //     console.log('cleanup: event 제거');
  //   };
  // }, []);

  useEffect(() => {
    getMovies();
  }, [pageNumber]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };
  /*
  handleObserver: 교차점이 발생했을 때 실행되는 콜백 함수.
  entries: 교차점 정보를 담는 배열
  isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  교차점이 발생하면 page 1 증가
  */

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  return (
    <>
      <Search />
      <section className="container">
        {/* {isLoading ? (
          <div className="loader">
          <span className="loader__text">Loading...</span>
          </div>
        ) : ( */}
          <div className="movies">
            {movieList.map((movie, index) => (
              <Movie
                key={index}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                rating={movie.rating}
                runtime={movie.runtime}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
            {isLoading ? (
              <Loading />
            ) : ''}
            <div id="observer"></div>
          </div>
        {/* )} */}
      </section>
    </>
  );
}

export default Home;
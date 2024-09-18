import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Star from '../components/Star';
import Runtime from '../components/Runtime';
import './Detail.css';

const scrollTop = () => {
  window.scrollTo({
    top: 0
  })
}

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(location.state.id);
  const [movie, setMovie] = useState({});
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMovieSuggestions = async () => {
    setIsLoading(true);
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`);
    const {
      data: {
        data: { movie }
      }
    } = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
    // movie.genres = ['aaaaaaaaa','bbbbbbbbbbbbb','c','d','a','b','c','d','a','b','c','d',...movie.genres];
    setMovie(movie);
    setIsLoading(false);
    setRelatedMovies([...movies]);
    scrollTop();
  };
  
  useEffect(() => {
    getMovieSuggestions();
  }, [id]);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    } else {
      getMovieSuggestions();
    }
  }, []);

  const replies = [
    {id:'zzang', content:'asdf'},
    {id:'zzang4', content:'asdf4'},
    {id:'zzang5', content:'asdf5'},
    {id:'zzang', content:'asdf'},
  ]
  
  return movie ? (
    <>
      <div className="detail_container">
        <img src={movie.poster || movie.medium_cover_image} alt={movie.title} title={movie.title} />
        <div className="detail_movie">
          <h3 className="detail_movie__title">{movie.title}</h3>
          <h5 className="detail_movie__year">{movie.year} <Star rating={movie.rating}/> <Runtime runtime={movie.runtime} /></h5>
          <ul className="detail_movie__genres">
            {movie.genres ? movie.genres.map((genre, index) => {
              return <li key={index} className="detail_movie__genre">{genre}</li>;
            }) : ''}
          </ul>
          <p className="detail_movie__summary">
            {movie.summary || movie.description_full}</p>
        </div>
      </div>
      <div className="detail_movie__relatedMovies">
        <h3>relatedMovies</h3>
        {relatedMovies.map((movie, i) => {
          return (
            <img key={i} src={movie.medium_cover_image} onClick={() => setId(movie.id)}/>
            // 리플 crud 만들기.. (몽고디비 써야하나?)
            // sort 만들기
            // pagination 만들고 scroll 과 클릭으로 선택해서 컴포넌트 change
            // search Bar 만들어서 서치&실렉트 컴포넌트 만들기
          )
        })}
      </div>
      <ul className="detail_replies">
        <h3>replies</h3>
      {replies.map((reply, i) => {
        return (
          <li 
            key={i} 
            style={{'height': '50px', 'backgroundColor':'gray', 'border':'1px solid black'}}>
          {reply.id} : {reply.content}
          </li>
        )
      })}
      </ul>
      {isLoading ? <Loading /> : ''}
    </>
  ) : (
    <span></span>
  )
}

export default Detail;
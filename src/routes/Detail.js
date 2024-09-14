import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Detail() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  });

  const replies = [
    {id:'zzang', content:'asdf'},
    {id:'zzang4', content:'asdf4'},
    {id:'zzang5', content:'asdf5'},
    {id:'zzang', content:'asdf'},
  ]
  
  return location.state ? (
    <div className="container">
      <img src={location.state.poster} alt={location.state.title} title={location.state.title} />
      <div className="movie">
        <h3 className="movie__title">{location.state.title}</h3>
        <h5 className="movie__year">{location.state.year}</h5>
        <ul className="movie__genres">
          {location.state.genres.map((genre, index) => {
            return <li key={1000+index} className="movie__genre">{genre}</li>;
          })}
        </ul>
        <p className="movie__summary">
          {location.state.summary}</p>
        {replies.map((reply, i) => <div key={i} style={{'height': '50px', 'backgroundColor':'gray', 'border':'1px solid black'}}>{reply.id} : {reply.content}</div>)}
      </div>
    </div>
  ) : (
    <span></span>
  )
}

export default Detail;
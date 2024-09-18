import PropTypes from 'prop-types';
import './Movie.css';
import { Link } from 'react-router-dom';
import Star from './Star';
import Runtime from './Runtime';

function Movie({ title, year, summary, poster, genres, rating, runtime, id }) {
  return (
    <div className="movie">
      <Link
        to='/movie-detail'
        state={{ year, title, summary, poster, genres, rating, runtime, id }}
      >
        <img src={poster} alt={title} title={title} />
        <div className="movie__data">
          <h3 className="movie__title">{title}</h3>
          <h5 className="movie__year">{year} <Star rating={rating}/> <Runtime runtime={runtime} /></h5>
          <ul className="movie__genres">
            {genres ? genres.map((genre, index) => {
              return <li key={index} className="movie__genre">{genre}</li>;
            }) : ''}
          </ul>
          <p className="movie__summary">{summary.length > 180 ? summary.slice(0, 180)+'...' : summary}</p>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string),
};

export default Movie;
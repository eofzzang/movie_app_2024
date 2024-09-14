import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

  const infinityScroll = () => {
    alert('asdf');
  }

  const pagination = () => {
    alert('fdsa');
  }

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <p onClick={infinityScroll}>infinityScroll</p>
      <p onClick={pagination}>pagination</p>
    </div>
  );
}

export default Navigation;
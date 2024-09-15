import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {

  // const infinityScroll = () => {
  //   alert('asdf');
  // }

  // const pagination = () => {
  //   alert('fdsa');
  // }

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      {/* <Link onClick={infinityScroll}>scroll</Link>
      <Link onClick={pagination}>paging</Link> */}
    </div>
  );
}

export default Navigation;
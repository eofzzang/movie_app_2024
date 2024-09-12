// import Home from './routes/Home';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './routes/About';
import Home from './routes/Home';
import Navi from './components/Navigation';
import Detail from './routes/Detail';

function App() {
  return (
    <HashRouter>
      <Navi />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/movie-detail' element={<Detail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
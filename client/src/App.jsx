import './app.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={user ? <Home /> : <Navigate replace to="/register" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate replace to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate replace to="/" />} />
        {user && (<><Route path="/movies" exact element={<Home type="movies" />} />
          <Route path="/series" exact element={<Home type="series" />} />
          <Route path="/watch" exact element={<Watch />} /></>)}

      </Routes>
    </BrowserRouter>
  )
};

export default App;

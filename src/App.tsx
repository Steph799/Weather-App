import {useState} from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.scss';
import Favorites from './components/Screens/favorites/Favorites';
import NotFound from './components/Screens/notFound/NotFound';
import NavBar from './components/Page/Header/NavBar';
import Primary from './components/Screens/primary/Primary';
import AppRoutes from './shared/routes';

function App() {
  const [popup, setPopup] = useState(false)

  return (
    <BrowserRouter>
      <NavBar popup={popup} setPopup={setPopup}  />
      <Routes>
        <Route path={AppRoutes.default} element={<Navigate replace to={AppRoutes.weather} />} />
        <Route path={AppRoutes.weather} element={<Primary popup={popup} setPopup={setPopup}/>} />
        <Route path={AppRoutes.favorites} element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

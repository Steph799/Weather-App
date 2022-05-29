import React, { useEffect } from 'react'
import './NavBar.scss'
import { Link } from 'react-router-dom';
import Switch from '../../Switch';
import AppRoutes from '../../../shared/routes';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { FavoriteCitiesState, FavoriteCity } from '../../../features/favorites/favoritesInterfaces';
import { PagesState } from '../../../features/pages/pagesInterfaces';
import Popup from '../../Popup';
import UseDialog from '../../utils/UseDialog';
import { changePage } from '../../../features/pages/pagesSlice'
import { StatusPage } from '../../../features/pages/pagesInterfaces'
import { useNavigate } from 'react-router-dom';
import { addCityToFavorite } from '../../../features/favorites/favoritesSlice';
import { emptyList, addCity } from '../../../shared/constants'


type NavBarProps = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>
  popup: boolean
}

function NavBar({ popup, setPopup }: NavBarProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { favoriteCities }: FavoriteCitiesState = useAppSelector((state) => state.favorite)
  const { page }: PagesState = useAppSelector(state => state.page)
  const { pathname } = window.location
  const error = !(pathname === AppRoutes.default || pathname === AppRoutes.weather || pathname === AppRoutes.favorites)
  
  if (error) dispatch(changePage(StatusPage.NotFound))

  useEffect(() => {
    const favorites = localStorage.getItem('favoriteCities')

    if (!favoriteCities.length && favorites) {
      const history: FavoriteCity[] = JSON.parse(favorites)
      history.forEach(city => dispatch(addCityToFavorite(city)))
    }
  }, [])


  useEffect(() => {
    if (page === StatusPage.NotFound) navigate(AppRoutes.pageNotFound)
  }, [page])


  const classLink = (status: StatusPage) => {
    const link = 'link'
    const linkSelected = 'linkSelected'

    if (error) return link //wrong url. don't select any choice
    if (status === StatusPage.weather && page === StatusPage.weather) return linkSelected //select weather
    else if (status === StatusPage.favorites && page === StatusPage.favorites) return linkSelected //select favorites
    return link //don't select 
  }

  const redirectToWeather = () => {
    setPopup(true)
    if (page === StatusPage.NotFound) dispatch(changePage(StatusPage.weather))
  }

  return (
    <nav className='navbar'>
      <span>
        Weather App
      </span>
      <Switch />
      <div>
        <Link to={AppRoutes.weather} onClick={() => dispatch(changePage(StatusPage.weather))}
          className={classLink(StatusPage.weather)}>
          Weather
        </Link>

        <Link to={favoriteCities.length ? AppRoutes.favorites : AppRoutes.weather}
          onClick={() => favoriteCities.length ? dispatch(changePage(StatusPage.favorites)) : redirectToWeather()}
          className={classLink(StatusPage.favorites)}>
          Favorites
        </Link>
      </div>
      {popup && <UseDialog setElement={setPopup}>
        <Popup header={emptyList} content={addCity} setElement={setPopup} />
      </UseDialog>}
    </nav>
  )
}

export default NavBar

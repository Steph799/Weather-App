import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'App/hooks';
import { FavoriteCitiesState, GoBackToFavoriteCity } from 'features/favorites/favoritesInterfaces';
import { removeCityFromFavorite } from 'features/favorites/favoritesSlice';
import { CityWeatherState, TemperatureUnits } from 'features/weather/weatherInterfaces';
import AppRoutes from 'shared/routes';
import FavoriteCard from '../../FavoriteCard/FavoriteCard';
import { changePage } from 'features/pages/pagesSlice';
import { StatusPage } from 'features/pages/pagesInterfaces';
import { MdDeleteOutline } from "react-icons/md";
import './Favorites.scss'

function Favorites() {
  const { favoriteCities }: FavoriteCitiesState = useAppSelector((state) => state.favorite)
  const weather: CityWeatherState = useAppSelector((state) => state.weather)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const removeCityFromFavoriteCities = (cityKey: string) => {
    if (favoriteCities.length === 1) {
      dispatch(removeCityFromFavorite(cityKey));
      dispatch(changePage(StatusPage.weather))
      navigate(AppRoutes.weather);
      return
    }

    dispatch(removeCityFromFavorite(cityKey));
  }

  const handleClickForecast = (cityKey: string) => {
    const desireCity = favoriteCities.find(city => city.cityKey === cityKey);

    if (desireCity) {
      const { cityName, countryNameShort } = desireCity

      dispatch(changePage(StatusPage.weather))
      navigate(AppRoutes.weather,
        {
          state: {
            desireCity: `${cityName}, ${countryNameShort}`,
          } as GoBackToFavoriteCity
        });
    }
  }
  return (
    <div className='favoritesContainer'>
      {favoriteCities.map(city => {
        const { cityKey, cityName, countryNameShort, shortDescription, description } = city
        return (
          <FavoriteCard key={cityKey}>

            <header className='cardHeader'>
              <h2> {cityName}, {countryNameShort}</h2>
              <h3>{shortDescription}</h3>
            </header>

            <p className="temp">
              {weather.temperatureUnit === TemperatureUnits.Celsius ?
                <>
                  {city.cityWeatherInfo.Temperature.Metric.Value.toFixed(0)}
                  <sup>&#x2103;</sup>
                </> :
                <>
                  {city.cityWeatherInfo.Temperature.Imperial.Value.toFixed(0)}
                  <sup>&#x2109;</sup>
                </>}
            </p>

            <div className='cardDescriptionContainer'>
              <p className="cardDescription">{description}</p>
            </div>

            <div className='buttons'>
              <Button onClick={() => handleClickForecast(cityKey)}>Show 5 days forecast</Button>
              <MdDeleteOutline className='delete' title="Delete city" color="#c62828" size={35} onClick={() => removeCityFromFavoriteCities(cityKey)} />
            </div>

          </FavoriteCard>)
      })}
    </div>
  )
}

export default Favorites

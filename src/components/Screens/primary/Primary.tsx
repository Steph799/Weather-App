import React, { useState, useEffect } from 'react'
import CityAutoComplete from '../../CityAutoComplete'
import Card from '../../WeatherCard/Card'
import './primary.scss'
import { useAppDispatch, useAppSelector } from '../../../App/hooks'
import { TemperatureUnits } from '../../../features/weather/weatherInterfaces'
import Forecast from '../../../features/weather/forecast/Forecast'
import {
  getWeatherByCurrentGeoLocation, getForecast, getCitiesAutocomplete,
  getCityWeatherInfoByCityName,
} from '../../../features/weather/weatherSlice'
import Button from '@mui/material/Button';
import { BiLocationPlus } from 'react-icons/bi';
import LoadingButton from '@mui/lab/LoadingButton';
import { addCityToFavorite } from '../../../features/favorites/favoritesSlice'
import { FavoriteCity, GoBackToFavoriteCity } from '../../../features/favorites/favoritesInterfaces'
import Popup from '../../Popup'
import UseDialog from '../../utils/UseDialog'
import { useLocation } from 'react-router-dom'
import { citySaved, citySaveFailed, locationNotSupported } from '../../../shared/constants'

type PrimaryProps = {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>
  popup: boolean
}

type Message = {
  header: string
  content: string
}

function Primary({ popup, setPopup }: PrimaryProps) {
  const [cityData, setCityData] = useState<string | null>(null);
  const [msg, setMsg] = useState<Message>({ header: '', content: '' });
  const { weather, favorite } = useAppSelector(state => state);
  const dispatch = useAppDispatch()
  const { Temperature } = weather.cityWeatherInfo

  let { state: routerState } = useLocation() as { state?: GoBackToFavoriteCity };

  useEffect(() => {
    //if router State exist fetch data from favorites
    if (routerState) {
      const { desireCity } = routerState;
   
      (async () => { await handleSelect(null, desireCity)})()
      return;
    }

    isUserGeolocationAvailable() //default- upload forecast from user location
  }, [])

  useEffect(() => {
    const { cityName, countryNameShort } = weather

    if (routerState) routerState = undefined

    setCityData(`${cityName}${cityName ? ',' : ''} ${countryNameShort}`)
  }, [weather.cityName, weather.countryNameShort])


  const handleSelect = async (e: React.SyntheticEvent<Element, Event> | null, selectedValue: string) => {
    if (selectedValue) {
      try {
        const { cityDetails } = await dispatch(getCityWeatherInfoByCityName((selectedValue))).unwrap()
        dispatch(getForecast(cityDetails[0].Key))
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
  }

  // Check if geolocation available
  const isUserGeolocationAvailable = () => {
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(getUserWeatherLocation); //available
    else alert(locationNotSupported)
  }

  // Get user location coordinates
  const getUserWeatherLocation = async (position: GeolocationPosition) => {
    try {
      const { cityInfo } = await dispatch(getWeatherByCurrentGeoLocation(position.coords)).unwrap();
      dispatch(getCitiesAutocomplete(cityInfo.EnglishName)); //fill the input box with the city
      dispatch(getForecast(cityInfo.Key))

    } catch (e: any) {
      alert(e.message)
    }
  }


  const handleAddingCityToFavorite = () => {
    const { cities, cityName, countryNameShort, cityWeatherInfo, fiveDaysForecast } = weather;

    if (favorite.favoriteCities.find(c => c.cityKey === cities[0].Key)) {
      const { header, content } = citySaveFailed(cityName)
      createMsg(header, content) 
      return
    }

    const cityToFavorite: FavoriteCity = {
      cityKey: cities[0].Key,
      cityName,
      countryNameShort,
      cityWeatherInfo,
      shortDescription: cityWeatherInfo.WeatherText,
      description: fiveDaysForecast.Headline.Text
    }
    dispatch(addCityToFavorite(cityToFavorite))
    const { header, content } = citySaved(cityName)
    createMsg(header, content) 
  }

  const createMsg = (header: string, content: string) => {
    setPopup(true)
    setMsg({ header, content })
  }

  return (
    <>
      <section className='citySection'>
        {weather.isUserAskedForItsLocation ? <LoadingButton
          loading
          variant="contained"
        >
          Loading...
        </LoadingButton> :
          <Button className="myLocation" variant="contained" onClick={isUserGeolocationAvailable}>
            <BiLocationPlus className="userLocation" />
            My Location
          </Button>}

        <CityAutoComplete handleSelect={handleSelect} />
        <Button disabled={weather.isUserAskedForWeather} variant="contained" size="large" onClick={handleAddingCityToFavorite}>
          Save
        </Button>
      </section>
      {
        weather.cityName && <section className='cityInfo' >
          <div>
            <h1 id="matchCity">{cityData}</h1>
            <h2 id="weatherText">{weather.cityWeatherInfo.WeatherText}</h2>
          </div>

          <Card>
            <div className='currentTemperature'>
              <p>{weather.temperatureUnit === TemperatureUnits.Celsius ?
                <>
                  {Temperature.Metric.Value.toFixed(0)}
                  <sup>&#x2103;</sup>
                </>
                :
                <>
                  {Temperature.Imperial.Value.toFixed(0)}
                  <sup>&#x2109;</sup>
                </>}
              </p>
            </div>
          </Card>
          <section>
            <h3 id='forecastSummary'>{weather.fiveDaysForecast.Headline.Text}</h3>
            <Forecast />
          </section>
        </section>
      }

      {popup && msg.content && <UseDialog setElement={setPopup}><Popup {...msg} setElement={setPopup} /></UseDialog>}
    </>
  )
}

export default Primary

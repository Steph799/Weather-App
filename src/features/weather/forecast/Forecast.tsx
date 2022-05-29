import {
    WiCloud,
    WiCloudyWindy,
    WiDayCloudy,
    WiDayHaze,
    WiMoonAltNew,
    WiNightClear,
    WiRainWind,
    WiThunderstorm,
    WiNightAltPartlyCloudy,
    WiHot,
    WiWindy
} from 'react-icons/wi';
import { RiMoonFoggyLine } from "react-icons/ri";
import { useAppSelector } from '../../../App/hooks';
import { CityWeatherState, ForecastDay, TemperatureUnits, TypeOfWeather } from '../weatherInterfaces';
import Card from '../../../components/WeatherCard/Card';
import './Forecast.scss'
import { convertToCelsius } from '../../../shared/constants';


// @Component - responsible for showing 5 days forecast.
const Forecast = () => {
    const weather: CityWeatherState = useAppSelector(state => state.weather);
    const { DailyForecasts } = weather.fiveDaysForecast

    const handleDateFormat = (date: string) => {
        const formattedDate = date.substring(5, 10).replace('-', '/');
        const nameOfDay = new Date(date).toDateString().substring(0, 4)

        return (
            <>
                <time>{formattedDate}</time>
                <time>{nameOfDay}</time>
            </>
        )
    }

    const fahrenheitToCelsius = (fahrenheitMin: number, fahrenheitMax: number) => (
        <p>{convertToCelsius(fahrenheitMin).toFixed(0)}&#176; / {convertToCelsius(fahrenheitMax).toFixed(0)}&#176;</p>
    )

    const getWeatherIcon = (day: ForecastDay) => {
        const iconSize = 35;
        const iconColor = "gray"
        const sunIconColor = "#ffec07"

        const getTypeOfWeatherIcon = (hasPrecipitation: boolean, IconPhrase: string) => {
            if (hasPrecipitation) {
                return IconPhrase.includes(TypeOfWeather.Storm) ?
                    <WiThunderstorm color={iconColor} size={iconSize} /> :
                    <WiRainWind color={iconColor} size={iconSize} />
            }

            switch (IconPhrase) {

                case TypeOfWeather.Hot:
                    return <WiHot color={sunIconColor} size={iconSize} />;

                case TypeOfWeather.Sunny:
                case TypeOfWeather.MostlySunny:
                    return <WiMoonAltNew color={sunIconColor} size={iconSize} />;

                case TypeOfWeather.MostlyClear:
                case TypeOfWeather.Clear:
                    return <WiNightClear color={iconColor} size={iconSize} />;

                case TypeOfWeather.PartlyCloudy:
                    return <WiNightAltPartlyCloudy color={iconColor} size={iconSize} />;

                case TypeOfWeather.PartlySunny:
                    return <WiDayCloudy color={iconColor} size={iconSize} />;

                case TypeOfWeather.IntermittentClouds:
                case TypeOfWeather.Cloudy:
                case TypeOfWeather.MostlyCloudy:
                    return <WiCloudyWindy color={iconColor} size={iconSize} />;

                case TypeOfWeather.HazySunshine:
                    return <WiDayHaze color={iconColor} size={iconSize} />;

                case TypeOfWeather.HazyMoonlight:
                    return <RiMoonFoggyLine color={iconColor} size={iconSize} />;

                case TypeOfWeather.Dreary:
                    return <WiCloud color={iconColor} size={iconSize} />;

                case TypeOfWeather.Windy:
                    return <WiWindy color={iconColor} size={iconSize} />;
            }
        }

        const dayIcon = getTypeOfWeatherIcon(day.Day.HasPrecipitation, day.Day.IconPhrase)
        const nightIcon = getTypeOfWeatherIcon(day.Night.HasPrecipitation, day.Night.IconPhrase)

        return (
            <div className="iconWeather">
                <p>{dayIcon}</p>
                <p>{nightIcon}</p>
            </div>
        )
    }

    return (<div className='forecast'>
        {DailyForecasts.map((day) => {
            const { Date, Temperature } = day
            const { Maximum, Minimum } = Temperature
            return (
                <Card key={Date}>
                    <div className='forecastCard'>
                        <header>{handleDateFormat(Date)}</header>

                        <footer>
                            {weather.temperatureUnit === TemperatureUnits.Celsius ?
                                fahrenheitToCelsius(Maximum.Value, Minimum.Value) :
                                <p>{Maximum.Value.toFixed(0)}&#176; / {Minimum.Value.toFixed(0)}&#176;</p>}

                            {getWeatherIcon(day)}
                        </footer>
                    </div>
                </Card>
            )
        }
        )}
    </div>
    )
}

export default Forecast

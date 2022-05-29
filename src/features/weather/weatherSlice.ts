import {
    CityWeatherState, TemperatureUnits, CityGeneralInfo, CityWeatherInfo, CityInformation,
    FiveDaysCityForecast
} from './weatherInterfaces';
import {getCitiesAutocompleteAPI, updateCity, getWeatherByCurrentGeoLocationAPI, getForecastAPI} from './weatherApi';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { convertToFahrenheit, convertToCelsius } from '../../shared/constants';


const initialState: CityWeatherState = {
    cities: [],
    fiveDaysForecast: {
        Headline: {
            Text: ""
        },
        DailyForecasts: [],
    },
    cityName: "",
    temperatureUnit: TemperatureUnits.Celsius,
    countryNameShort: "",
    cityWeatherInfo: {
        Temperature: {
            Metric: {
                Value: 0,
                Unit: TemperatureUnits.Celsius,
            },
            Imperial: {
                Value: 0,
                Unit: TemperatureUnits.Fahrenheit,
            }
        },
        WeatherText: "",
    },
    isUserAskedForItsLocation: false,
    isUserAskedForWeather: false,
};


export const getCitiesAutocomplete = createAsyncThunk('weather/getCitiesAutocomplete',
    async (city: string): Promise<CityGeneralInfo[]> =>await getCitiesAutocompleteAPI(city)
)

export const getCityWeatherInfoByCityName = createAsyncThunk('weather/getCityWeatherInfoByCityName',
    async (cityName: string): Promise<{ cityDetails: CityGeneralInfo[]; cityWeather: CityWeatherInfo[] }> =>
        await updateCity(cityName)
)

export const getWeatherByCurrentGeoLocation = createAsyncThunk('weather/getWeatherByCurrentGeoLocation',
    async (coordinates: { latitude: number, longitude: number }):
        Promise<{ cityWeatherInfo: CityWeatherInfo[]; cityInfo: CityInformation }> =>
        await getWeatherByCurrentGeoLocationAPI(coordinates.latitude, coordinates.longitude)
)

export const getForecast = createAsyncThunk('weather/getForecast',
    async (locationKey: string): Promise<FiveDaysCityForecast> => await getForecastAPI(locationKey)
)

export const getUpdatedWetherFromFavorites = createAsyncThunk('weather/getCityWeatherInfoFromFavorites',
    async (cityData: string[]): Promise<{ cityDetails: CityGeneralInfo[]; cityWeather: CityWeatherInfo[] }> =>
        await updateCity(cityData[0])
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        changeTemperatureUnit: (state) => {
            const tempObj = state.cityWeatherInfo.Temperature

            // Celsius => Fahrenheit
            if (state.temperatureUnit === TemperatureUnits.Celsius) {
                state.temperatureUnit = TemperatureUnits.Fahrenheit
                const CelsiusValue = tempObj.Metric.Value
                tempObj.Imperial.Value = convertToFahrenheit(CelsiusValue)

                return
            }

            // Fahrenheit => Celsius
            state.temperatureUnit = TemperatureUnits.Celsius
            const FahrenheitValue = tempObj.Imperial.Value
            tempObj.Metric.Value = convertToCelsius(FahrenheitValue)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCitiesAutocomplete.fulfilled, (state, { payload }) => {   
            state.cities = [...payload];
        });

        builder.addCase(getCityWeatherInfoByCityName.pending, (state) => {
            state.isUserAskedForWeather = true;
        })

        builder.addCase(getCityWeatherInfoByCityName.rejected, (state) => {
            state.isUserAskedForWeather = false;
        })

        builder.addCase(getCityWeatherInfoByCityName.fulfilled, (state, { payload }) => {
            state.isUserAskedForWeather = false;
            const { cityDetails, cityWeather } = payload
            state.cities = [...cityDetails]
            state.cityName = cityDetails[0].LocalizedName
            state.countryNameShort = cityDetails[0].Country.ID
            state.cityWeatherInfo = cityWeather[0]
        });

        builder.addCase(getWeatherByCurrentGeoLocation.pending, (state) => {         
            state.isUserAskedForItsLocation = true;            
        })

        builder.addCase(getWeatherByCurrentGeoLocation.rejected, (state) => {
            state.isUserAskedForItsLocation = false;   
        })

        builder.addCase(getWeatherByCurrentGeoLocation.fulfilled, (state, { payload }) => {
            state.isUserAskedForItsLocation = false;
            const { cityWeatherInfo, cityInfo } = payload;
            state.cityWeatherInfo.Temperature = cityWeatherInfo[0].Temperature
            state.cityWeatherInfo.WeatherText = cityWeatherInfo[0].WeatherText;
            state.cityName = cityInfo.EnglishName;
            state.countryNameShort = cityInfo.AdministrativeArea.CountryID;
        })

        builder.addCase(getForecast.fulfilled, (state, { payload }) => {
            state.fiveDaysForecast.Headline.Text = payload.Headline.Text
            state.fiveDaysForecast.DailyForecasts = [...payload.DailyForecasts]            
        });
    }
})

export const { changeTemperatureUnit } = weatherSlice.actions;
export default weatherSlice.reducer

import axios from "axios";
import { CityGeneralInfo, CityWeatherInfo, CityInformation, FiveDaysCityForecast } from "./weatherInterfaces";
import { baseWeatherUrl, notFound, notAvailable } from "../../shared/constants";

const axiosInstance = axios.create({
    baseURL: baseWeatherUrl,
    params: {
        apikey: process.env.REACT_APP_API_KEY
    },
})

//get wether information
export const updateCity = async (city: string):
 Promise<{ cityDetails: CityGeneralInfo[]; cityWeather: CityWeatherInfo[] }> => {
    const cityDetails = await getCityAPI(city)
    const cityWeather = await getWetherAPI(cityDetails[0].Key)

    return { cityDetails, cityWeather }
}

export const getWetherAPI = async (id: string): Promise<CityWeatherInfo[]> => {
    const wetherUrl = "currentconditions/v1"

    try {
        const { data } = await axiosInstance.get<CityWeatherInfo[]>(`${wetherUrl}/${id}`)
        return data
    } catch (error) {
        throw new Error(notFound('Key'));
    }
}

//get city information
export const getCityAPI = async (city: string): Promise<CityGeneralInfo[]> => {
    const cityUrl = "locations/v1/cities/search"
    
    try {
        const { data } = await axiosInstance.get<CityGeneralInfo[]>(cityUrl, { params: { q: city } });
        return data
    } catch (error) {
        throw new Error(notFound('City'));
    }
}

// Get list of cities base on search query
export const getCitiesAutocompleteAPI = async (city: string): Promise<CityGeneralInfo[]> => {
    const cityAutocomplete = "locations/v1/cities/autocomplete"
    try {
        return (await axiosInstance.get<CityGeneralInfo[]>(cityAutocomplete, {params: { q: city }})).data;
    } catch (error) {
        throw new Error(notFound('City'));
    }
}

export const getWeatherByCurrentGeoLocationAPI = async (latitude: number, Longitude: number):
    Promise<{ cityWeatherInfo: CityWeatherInfo[]; cityInfo: CityInformation; }> => {
    const currentPositionAPi = "locations/v1/cities/geoposition/search"
    const currentPosition = `${latitude},${Longitude}`

    try {
        const cityInfo = (await axiosInstance.get<CityInformation>(currentPositionAPi, { params: { q: currentPosition } })).data;
        const cityWeatherInfo: CityWeatherInfo[] = await getCityWeatherInfoByCityKeyAPI(cityInfo.Key);

        return { cityInfo, cityWeatherInfo }
    } catch (error) {
        throw new Error(notFound('Position'));
    }
}

//get info of a selected city
export const getCityWeatherInfoByCityKeyAPI = async (cityKey: string): Promise<CityWeatherInfo[]> => {
    const cityWeatherInfo = `currentconditions/v1/${cityKey}`
    try {
        return (await axiosInstance.get<CityWeatherInfo[]>(cityWeatherInfo)).data;
    } catch (error) {
        throw new Error(notAvailable("City weather info"));
    }
}

export const getForecastAPI = async (locationKey: string): Promise<FiveDaysCityForecast> => {
    const forecast = `forecasts/v1/daily/5day/${locationKey}`
    try {
        return (await axiosInstance.get<FiveDaysCityForecast>(forecast)).data
    } catch (error) {
        throw new Error(notAvailable("Weather forecasts"));
    }
}



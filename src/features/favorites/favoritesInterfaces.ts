import { CityWeatherInfo } from "../weather/weatherInterfaces";

export interface FavoriteCity {
    cityKey: string;
    cityName: string;
    countryNameShort: string;
    cityWeatherInfo: CityWeatherInfo
    shortDescription: string;
    description: string;
}


export interface GoBackToFavoriteCity {
    desireCity: string;
}


export interface FavoriteCitiesState {
    favoriteCities: FavoriteCity[]
}
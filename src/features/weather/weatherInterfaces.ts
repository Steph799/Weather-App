export enum TemperatureUnits {
    Celsius = "C",
    Fahrenheit = 'F',
}

export enum TypeOfWeather {
    Hot = "Hot",
    Sunny = "Sunny",
    MostlySunny = "Mostly sunny",
    PartlySunny = "Partly sunny",
    MostlyClear = "Mostly clear",
    Clear = "Clear",
    PartlyCloudy = "Partly cloudy",
    IntermittentClouds = "Intermittent clouds",
    Cloudy = "Cloudy",
    MostlyCloudy = "Mostly cloudy",
    HazySunshine = "Hazy sunshine",
    HazyMoonlight = "Hazy moonlight",
    Dreary = "Dreary",
    Storm = "Storms",
    Windy ="Windy"
}

// When I search for city.
export interface CityGeneralInfo {
    Version: number,
    Key: string,
    Type: string,
    Rank: number,
    LocalizedName: string,
    Country: {
        ID: string,
        LocalizedName: string
    },
    AdministrativeArea: {
        ID: string,
        LocalizedName: string,
    },
}

// When I give a city key to grab the city temperature.
export interface CityWeatherInfo {
    Temperature: {
        Metric: {
            Value: number,
            Unit: TemperatureUnits.Celsius, 
        },
        Imperial: {
            Value: number,
            Unit: TemperatureUnits.Fahrenheit,
        },
    }
    WeatherText: string;
}



// When I give latitude and longitude to grab the city temperature and general info.
export interface CityInformation {
    AdministrativeArea: {
        ID: string,
        CountryID: string,
    },
    EnglishName: string,
    Key: string,
    WeatherText: string;
}

export interface ForecastDay {
    Date: string,
    Day: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: boolean
        PrecipitationType?: string,
    }
    Night: {
        Icon: number,
        IconPhrase: string,
        HasPrecipitation: boolean,
        PrecipitationType?: string,
    }
    Temperature: {
        Minimum: {
            Value: number,
            Unit: TemperatureUnits, 
        },
        Maximum: {
            Value: number,
            Unit: TemperatureUnits,
        }
    },
}

export interface FiveDaysCityForecast {
    Headline: {
        Text: string,
    },
    DailyForecasts: ForecastDay[];
}


export interface CityWeatherState {
    cities: CityGeneralInfo[];
    fiveDaysForecast: FiveDaysCityForecast;
    temperatureUnit: TemperatureUnits;
    cityName: string;
    countryNameShort: string;
    cityWeatherInfo: CityWeatherInfo;
    isUserAskedForItsLocation: boolean;
    isUserAskedForWeather: boolean;
}
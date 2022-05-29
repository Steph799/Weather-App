export const baseWeatherUrl = 'https://dataservice.accuweather.com/'

export const convertToCelsius = (Ftemp: number) => (5 / 9) * (Ftemp - 32)
export const convertToFahrenheit = (Ctemp: number) => (Ctemp * 9 / 5) + 32

export const emptyList = "List is empty"
export const addCity = "Please add a city to favorites"
export const locationNotSupported = 'This browser does not support location share.'

export const notFound = (item: string) => `${item} not found`
export const notAvailable = (item: string) => `${item} is not available`

export const citySaveFailed = (cityName: string):{header: string, content: string} =>
    ({ header: 'Save Failed', content: `${cityName} already added to favorites cities`})

export const citySaved = (cityName: string): { header: string, content: string}=>
({ header: 'Saved!', content: `${cityName} was added to favorites cities`})
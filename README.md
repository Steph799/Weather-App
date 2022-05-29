 ### Open an account in AccuWeather (https://developer.accuweather.com/)

 ### After login, create the app: myApps->add a new app and follow the instructions (desktop application, programming language- javascript...)

 ### after creating the app, you will get an API key. Create a .env file and a property: REACT_APP_API_KEY. Assing it with your API key. 
 
Description: 
Users can search for any city in the world and get the current weather and five days of the weather forecast.
Users can save their favorite location, and it will be saved on the Favorites page. 
Clicking on a favorite city forecast will navigate to the main screen showing the details of that city.

Application APIs:
In this app, I use 4 Accuweather APIs: 

- Autocomplete search - Returns a matching of the search text. 
- Current Conditions - Returns current conditions data for a specific location. 
- 5 Days of Daily Forecasts - Returns an array of daily forecasts for the next 5 days for a specific location. 
- Geoposition Search - Returns information about the current location by GeoPosition (user location).

Programming language: Typescript.
State management: Redux Toolkit.

**Note: the AccuWeather account Allowed you to make 50 API calls per day! **

/**
 * Weather App:
 * In this guide, we'll build a weather app that fetches data based on the
 * user's current location, by leveraging OpenWeatherMap API.
 * a. Uses the Geolocation API to get the user's current location.
 * b. Fetches weather data using the OpenWeatherMap API.
 * c. This proejcts combines state management, API integration, and React
 *    lifecycle management - skills frequently assessed in interviews.
*/

/**
 * Problem Statement:
 * We need to create a weather app that:
 * a. Get the user's current location (latitude and longitude)
 * b. Fetch weather data from the OpenWeatherMap API using these coordinates.
 * c. Show a loading message while fetching the data.
 *    - City name
 *    - Current temperature
 *    - Weather description
 *    - Maximum and minimum temperature
 *    - Humidity
*/

/**
 * Step-1: Setting up the Main Component
 * The App component manages the app's state and handles fetching weather
 * data based on the user's location.
 * 
 * Breaking down logic:
 * 1. State Management:
 *    - dataFetched: Tracks whether the weather data has been fetched successfully.
 *    - response   : Stores the weather data received from the OpenWeatherMap API.
 * 
 * 2. Fetching Data:
 *    - getWeatherData: Makes an API call using the provided latitude and longitude.
 *    - Updates response with the fetched data and sets dataFetched to true.
 * 
 * 3. Getting Location:
 *    - navigator.geolocation.getCurrentPosition: Retrieves the user's 
 *      current location (latitude and longitude).
 *    - Calls showPosition, which then fetches the weather data using
 *      getWeatherData.
 * 
 * 4. Rendering the Weather Data:
 *    - Displays a loading message until the data is fetched.
 *    - Once the data is available, renders the weather details dynamically.
 * 
 * Note: Also do the styling in the App.css file.
*/

/**
 * Understanding the App Component:
 * 1. State Management: dateFetched is set to false initially, indicating
 *    that data hasn't been fetched yet. response is initialized to null
 *    to store the API response.
 * 2. Fetching Data: The useEffect hook runs once on component mount and 
 *    uses the browser's geolocation API to further call the getCurrentPosition
 *    fetches weather data using the latitude and longitude.
 * 3. Rendering Data: If dataFetched is false, the app shows a 'Loading...'
 *    message. Once data is fetched, the weather details is displayed
 *    dynamically using the response.
*/

import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [dataFetched, setDataFetched] = useState(false)
  const [response, setResponse] = useState(null)

  const getWeatherData = (latitude, longitude) => {
    console.log('currentLocation.latitude', latitude, longitude)
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bf909b4a90c47e810fc156dc73c0ed75`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        setResponse(result)
        setDataFetched(true)
      })
      .catch(error => {
        console.error("Weather data fetch mein error aaya:", error);
      });
  };

  const showPosition = (pos) => {
    console.log('poss', pos)
    getWeatherData(pos.coords.latitude, pos.coords.longitude)
  }

  useEffect(() => {
    if(navigator.geolocation){
      let returnPosition = navigator.geolocation.getCurrentPosition(showPosition)
      console.log('returnPosition', returnPosition)
    }
  }, []);

  /**
   * Convert Kelvin to Celsius:
   * 1. Subtract 273.15 from the Kelvin temperature.
   * 2. Round the result to 2 decimal places.
   * 3. Return the result.
  */
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  }

  return (
    <div>
      {dataFetched ?
        <>
          <div className="city-name">{response.name}</div>
          <div className="description">{`Current Temperature: ${kelvinToCelsius(response.main.temp)}°C`}</div>
          <div className="description">{`Description: ${response.weather[0].description}`}</div>
          <div className="description">{`Max Temperature: ${kelvinToCelsius(response.main.temp_max)}°C`}</div>
          <div className="description">{`Min Temperature: ${kelvinToCelsius(response.main.temp_min)}°C`}</div>
          <div className="description">{`Humidity: ${response.main.humidity}%`}</div>
        </>
        :
        <div>Loading...</div>
      }
    </div>
  )
}

export default App;


/**
 * Key Points:
 * 1. Geolocation Integration: The app uses the browser's geolocation API
 *    to get the user's current location. Demonstrates how to work with
 *    user permissions and fetch dynamic data.
 * 2. API Integration: Fetches data from the OpenWeatherMap API using the
 *    user's coordinates. Show how to work with asynchronous data and
 *    update the UI dynamically.
 * 3. State Management: Separates concerns by using dataFetched to manage
 *    loading state and response to handle fetched data.
 * 4. Responsive UI: Displays a loading message until data is ready and
 *    uses clean CSS for a polished appearance.
*/

/**
 * Interview Tips:
 * 1. Explain State Handling: Highlight the purpose of dataFetched and
 *    response in managing the app's dynamic behavior.
 * 2. Discuss API Integration: Emphasize how fetch is usedd to retrieve
 *    real-time data from an external API.
 * 3. Propose Enhancements: Add user input for city search. Display additional
 *    weather details like wind speed or a weather icon.
 * 4. Highlight Geolocation Use: Discuss how the Geolocation API handles
 *    user permission and integrates with the app.
*/
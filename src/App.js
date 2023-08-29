import { useEffect, useState } from 'react';
import './App.css';
import { weatherData } from "./utils/index"

function App() {
  const [sunset, setSunset] = useState()
  const [sunrise, setSunrise] = useState()
  const [weather, setWeather] = useState()
  const [city, setCity] = useState()
  const submitHandler = async (event) => {
    event.preventDefault()
    let data = await weatherData(city)
    setWeather(data)
  }
  useEffect(() => {
    if (weather !== undefined && weather.sys){
      setSunset(new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-GB"))
      setSunrise(new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-GB"))
    }
    

  },[weather])
    

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label>City: &nbsp;
          <input onChange={(event) => setCity(event.target.value)} required></input>
        </label>
        <br></br>
        <button type="submit">Click to see weather</button>
      </form>
      {weather === undefined ? <p>Please enter a city name</p> : weather.message === "city not found" ? <p>{weather.message}</p> :
        <div>
        <h3>The weather for {city} is:</h3>
        <p>Weather: {weather.weather[0].main}</p>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Feels like: {weather.main.feels_like}°C</p>
        <p>Wind speed: {weather.wind.speed} m.p.h</p>
        <p>Sunrise: {sunrise}</p> 
        <p>Sunset: {sunset}</p>
      </div>}
    </div>
  );
}

export default App;

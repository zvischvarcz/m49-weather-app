import { useEffect, useRef, useState } from 'react';
import { weatherData, deleteUserByID, addFavorite, getUser } from "../utils/index"
import { useNavigate } from 'react-router-dom';
import { deleteCookie, getCookie } from '../common';
import '../App.css'

function Weather() {
  const favButton = useRef()
  const [sunset, setSunset] = useState()
  const [sunrise, setSunrise] = useState()
  const [weather, setWeather] = useState()
  const [city, setCity] = useState("")
  const [deleteRes, setDeleteRes] = useState()
  const [addFavRes, setAddFavRes] = useState()
  const [favCities, setFavCities] = useState([])

  const navigate = useNavigate()


  useEffect(() => {
    let cookie = getCookie("jwt-token")
      if (cookie === false) {
        navigate('/')
      } 
    }, [navigate])

  const logOut = () => {
      deleteCookie("jwt-token")
      navigate('/')
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    let data = await weatherData(city)
    setWeather(data)
    favButton.current.className = "flex"
  }
  useEffect(() => {
    if (weather !== undefined && weather.sys){
      setSunset(new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-GB"))
      setSunrise(new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-GB"))
    }
  },[weather])
  
  const deleteUser = async () => {
    let cookie = getCookie("jwt-token")
    let res = await deleteUserByID(cookie)
    try {
      if (res.amount >= 1){
        deleteCookie("jwt-token")
        navigate("/")
      }
    } catch (error){
      console.log(error)
      setDeleteRes("Delete unsuccessful")
    }
  }
  const addFav = async (event) => {
    event.preventDefault()
    let cookie = getCookie("jwt-token")
    let res = await addFavorite(city, cookie)
    try {
      if (res.message){
        setAddFavRes(res.message)
        favButton.current.className = "hidden"
      }
    } catch (error){
      console.log(error)
      setAddFavRes("Unsuccessful")
    }
    
  }

  useEffect(() => {
    const getFav = async () => {
      let cookie = getCookie("jwt-token")
      let user = await getUser(cookie)
      let locations = user.favoriteLocations.split(", ")
      setFavCities(locations)
      
    }
    getFav()
  }, [addFavRes])
  
  const favWeather = async (value) => {
    setCity(value)
    let data = await weatherData(value)
    setWeather(data)
    favButton.current.className = "flex"
  }
    

  return (
    <div className="WeatherApp">
      <form onSubmit={submitHandler} className='WeatherForm'>
        <label>City: &nbsp;
          <input onChange={(event) => setCity(event.target.value)} required></input>
        </label>
        <div>
          <select onChange={(event) => favWeather(event.target.value)}>
            <option>Favourites</option>
            {favCities.map((name, index) => {
              return (
                <option key={index} value={name}>{name}</option>
              )
            })}
          </select>
        </div>          

        <br></br>
        <div className='flex'> 
          <button type="submit">Click to see weather</button>
          <div className="hidden" ref={favButton}>
            <button onClick={addFav} >Add {city} to favourites</button>
            
          </div>
          <p>{addFavRes}</p>
        </div>
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
      <div>
        <button onClick={logOut}>Log out</button>
      </div>
      <div>
      <button onClick={deleteUser}>Delete user</button>
      <p>{deleteRes}</p>
      </div>
    </div>
  );
}

export default Weather;

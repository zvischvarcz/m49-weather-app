const apiKey = "8d6058e8106244bda128ef7e7cade40b"

export const weatherData = async (location, setWeather) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`)
        const data = await response.json()
        setWeather({data: data})
    } catch (error) {
        console.log(error)
    }
}
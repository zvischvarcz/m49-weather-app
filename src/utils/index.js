

export const weatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}
import { writeCookie } from "../common"

export const weatherData = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}


export const login = async (username, email, password) => {
    console.log("LOGIN FUNCTION RUNNING")
    try {
        const response = await fetch (`${process.env.API_LINK}users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        })
        const data = await response.json();
        console.log("LOGIN DATA =", data)
        if (data.errorMessage){
            console.log("ERROR IN LOGIN FUNCTION =", data.errorMessage)
            return
        }
        writeCookie("jwt-token", data.user.token, 7)
        return(data)
        
    } catch (error) {
        console.log(error)
    }
}


export const register = async (username, email, password, newUser) => {
    try {
        const response = await fetch (`${process.env.API_LINK}users/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        }) 
        const data = await response.json();
        newUser(data.user.username)
        
        return(data)
          
    } catch (error) {
        console.log(error)
    }
}

export const authCheck = async (token) => {
    try {
        const response = await fetch(`${process.env.API_LINK}users/authCheck`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : token
            },
        })
        const data = await response.json()
        return data.user.username
    } 
    catch (error) {
        console.log(error)
    }
}

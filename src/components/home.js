import React from "react"
import { useState, useEffect } from "react"
import { login, register } from "../utils"
import '../App.css'
import { useNavigate } from "react-router-dom"
import { getCookie } from "../common"



const Home = () => {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [loginResponse, setLoginResponse] = useState()
    const [registerResponse, setRegisterResponse] = useState()

    

    useEffect(() => {
        let cookie = getCookie("jwt-token")
        if (cookie !== false) {
            navigate('/weather')
        }
    })
    
    const loginHandler = async (event) => {
        event.preventDefault()
        let loginRes = await login(username, email, password)
        if (loginRes.message === "Success"){
            navigate('/weather')
        } else {
            setLoginResponse(loginRes)
        }
    }

    const registerHandler = async (event) => {
        event.preventDefault()
        let registerRes = await register(username, email, password)
        
        if (registerRes.message === "Successfully registered"){
            setRegisterResponse(registerRes.message)
        } else if (registerRes === 'Validation error') {
            setRegisterResponse("This user already exists, please log in")
        } else {
            setRegisterResponse(registerRes)
        }
    }

    return (
        <div className="Home">
            <div className="LoginBox">
                <h2>Login below</h2>
                <form onSubmit={loginHandler} className="LoginForm">
                    <label className="LoginLabel">Username
                        <input onChange={(event) => setUsername(event.target.value)} required></input>
                    </label>
                    <br></br>
                    <label className="LoginLabel">Email
                        <input onChange={(event) => setEmail(event.target.value)} required></input>
                    </label>
                    <br></br>
                    <label className="LoginLabel">Password
                        <input type='password' onChange={(event) => setPassword(event.target.value)} required></input>
                    </label>
                    <br></br>
                    <button type='submit'>Login</button>
                </form>
                <br></br>
                <p>{loginResponse}</p>
            </div>
            <div className="RegisterBox">
                <h2>Please register below</h2>
                <form onSubmit={registerHandler} className="RegisterForm">
                    <label className="RegisterLabel">Username &nbsp; 
                        <input onChange={(e) => {setUsername(e.target.value)}} required></input>
                    </label>
                    <br></br>
                    <label className="RegisterLabel">Email &nbsp; 
                        <input  onChange={(e) => {setEmail(e.target.value)}} required></input>
                    </label>
                    <br></br>
                    <label className="RegisterLabel">Password &nbsp; 
                        <input type='password'  onChange={(e) => {setPassword(e.target.value)}} required></input>
                    </label>
                    <br></br>
                    <button type='submit'>Register</button>
                </form>
                <br></br>
                <p>{registerResponse}</p>
            </div>
        </div>
    )

}

export default Home